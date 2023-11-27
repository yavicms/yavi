
module.exports = function Register(User) {

    Object.defineProperty(User, "Register", {
        writable: false,
        value: async function (info) {
        }
    });
}