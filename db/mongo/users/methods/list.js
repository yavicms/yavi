
module.exports = function (User) {
    Object.defineProperty(User, "List", {
        writable: false,
        value: async function (req) {
            return await User.find();
        }
    })
}