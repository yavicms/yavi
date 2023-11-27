const add = require('./new');
const list = require('./list');

module.exports = function (model) {

    /**
     * Register
     */
    add(model);

    /**
     * Get List Users
     */
    list(model);

    // Register(schema);

    /**
     * Xác nhận người dùng
     */
    // Confirm(schema);

    /**
     * Login
     */
    // Login(schema);

    /**
     * Tìm kiếm người dùng
     * Đầu vào: info: { text, limit, page }
     */
    // Search(schema);
}