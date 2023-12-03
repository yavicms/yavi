const Post = require('yavi/db/mongo/posts');

/**
 * Thêm bài viết mới
 */
module.exports = function (req) {
    return Post.Add(req.body);
}