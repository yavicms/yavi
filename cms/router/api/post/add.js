const Post = require('yavi/db/mongo/posts');
const Form = require("yavi/db/mongo/posts/form");

/**
 * Thêm bài viết mới
 */
module.exports = function (req) {

    var form, post;

    form = new Form(req.body);
    form.user = req.User._id;

    post = new Post(form.data);

    console.log(post);
}