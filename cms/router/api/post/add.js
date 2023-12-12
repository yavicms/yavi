const Post = require('yavi/db/mongo/posts');

/**
 * Thêm bài viết mới
 */
module.exports = function (req) {
    req.body.user = "656614e6674e555be1a0a2ba";
    return Post.Add(req.body);
}