const { is } = require('yavi/lib');

module.exports = function Confirm(schema, model) {

    /**
     * Xác nhận người dùng
     * Đầu vào: info: {type [email, phone], code}
     */
    schema.method("Confirm", async function (info) {

        if (is.object(info) && is.string(info.type) && is.string(info.code)) {

        }
    });
}