const Post = require("yavi/db/mongo/posts");


module.exports = function (app) {

    app.data("admin:posts", function (req) {
        return Post.Find();
    });
}