const Plugin = require("yavi/plugin");
const $notext = "";
const validate = {
    username(value) {
        return /^([a-zA-Z0-9\-\_\.\@]{5,100})$/.test(value);
    },
    password(value) {
        return /^([^\n\r\t]{8,200})$/.test(value);
    }
};
const login = require('./login');
const register = require('./register');
const forgot = require('./forgot');

module.exports = function (app) {

    const jwt_secret = Plugin.info.jwt_secret;

    /**
     * Login Form data:
     * req.body = {username, password}
     */
    login(app, jwt_secret, validate, $notext);

    /**
     * Tạo tài khoản mới
     * req.body = {firstname, lastname, email}
     */
    register(app, jwt_secret, validate, $notext);

    /**
     * Quên mật khẩu
     * req.body = {email,username,phone}
     */
    forgot(app, jwt_secret, validate, $notext);
}