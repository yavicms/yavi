const Plugin = require("yavi/plugin");
const login = require('./login');
const register = require('./register');
const forgot = require('./forgot');
const verify = require("./verify");

module.exports = function (app) {

    const jwt_secret = Plugin.info.jwt_secret;

    /**
     * Render HTML (http: GET)
     */
    app.get("account", function (req, res) {

        app.get_content("get.account." + (req.params[0] || "login"), req)
            .then((data) => res.html("account", data))
            .catch(async () => res.html("account", await app.get_data("error.account", req)));
    });

    /**
     * Tạo tài khoản mới
     * req.body = {firstname, lastname, email/phone, password}
     */
    register(app, jwt_secret);

    /**
     * Xác thực tài khoản
     * req.query = {code, email/phone}
     */
    verify(app, jwt_secret);

    /**
     * Login Form data:
     * req.body = {username, password}
     */
    login(app, jwt_secret);

    /**
     * Quên mật khẩu
     * req.body = {email/username/phone}
     */
    forgot(app, jwt_secret);
}