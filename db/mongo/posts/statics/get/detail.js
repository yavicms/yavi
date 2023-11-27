
const mongoose = require('mongoose');
const { is } = require('yavi/lib');
const { ObjectId } = mongoose.Types;
const Comment = require("yavi/db/mongo/comments");

module.exports = function (Post) {

    /**
     * Lấy bài viết chi tiết
     */
    Object.defineProperty(Post, "Detail", {
        writable: false,
        value: async function (postid) {
            try {

                if (!ObjectId.isValid(postid)) postid = new ObjectId(postid);

                if (postid) {

                    // Lấy thông tin bài viết
                    const post = await Post.findById(postid)
                        .populate('user', '_id username fullname role thumb created') // Liên kết với UserSchema và chỉ lấy một số trường cần thiết
                        .populate('tags', '_id title type'); // Liên kết với TagSchema và chỉ lấy một số trường cần thiết

                    if (post) {

                        // Lấy comment mới nhất từ commentSchema
                        post.comments = await Comment.findOne({ post: postid })
                            .sort({ 'comments.created': -1 })
                            .populate('comments.user', '_id username fullname role thumb created') // Liên kết với UserSchema và chỉ lấy một số trường cần thiết
                            .limit(1);

                        return post;
                    }
                }

            } catch (error) {

            }
        }
    });
}