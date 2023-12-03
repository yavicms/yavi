const FormPost = require("../form");

module.exports = function (Post) {

    Object.defineProperty(Post, "Add", {
        writable: false,
        value: async function (data) {
            try {

                let form = new FormPost(data);
                let post = new Post(form.data);

                return post.save();

            } catch (error) {
                console.log(__filename, error);
                throw new Error(error);
            }
        }
    });
}