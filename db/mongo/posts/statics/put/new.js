
module.exports = function (Post) {

    Object.defineProperty(Post, "Add", {
        writable: false,
        value: async function (data) {
            try {
                console.log(data);
            } catch (error) {
                console.log(__filename, error);
            }
        }
    });
}