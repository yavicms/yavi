const { is } = require('yavi/lib');

module.exports = function Confirm(User) {

    /**
     * Xác nhận người dùng
     * Đầu vào: info: {type [email, phone], code}
     */
    Object.defineProperty(User, "Confirm", {
        writable: false,
        value: async function (info) {
            if (is.object(info) && is.string(info.type) && is.string(info.code)) {

            }
        }
    });
}