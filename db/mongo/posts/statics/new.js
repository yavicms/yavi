const FormPost = require("../form");

module.exports = function (Post) {

    Object.defineProperty(Post, "Add", {
        writable: false,
        value(data) {
            let form = new FormPost(data);
            let post = new Post(form.data);

            return post.save();
        }
    });
}