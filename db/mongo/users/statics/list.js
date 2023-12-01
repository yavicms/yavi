
module.exports = function (User) {

    /**
     * Lấy danh sách users
     * info: {limit, page}
     */
    Object.defineProperty(User, "List", {
        writable: false,
        value: async function (info) {

        }
    });

}