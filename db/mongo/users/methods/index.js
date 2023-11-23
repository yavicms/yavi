const Login = require('./login');
const Register = require('./register');
const Search = require('./search');
const Confirm = require('./confirm');

module.exports = function (schema, model) {

    /**
     * Register
     */
    Register(schema, model);

    /**
     * Xác nhận người dùng
     */
    Confirm(schema, model);

    /**
     * Login
     */
    Login(schema, model);

    /**
     * Tìm kiếm người dùng
     * Đầu vào: info: { text, limit, page }
     */
    Search(schema, model);
}