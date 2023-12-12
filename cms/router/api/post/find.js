const Post = require('yavi/db/mongo/posts');

module.exports = function (req) {

    return Post.find();
}