const jwt = require('jsonwebtoken');
const User = require('yavi/db/mongo/users');
const { user_validate } = require("yavi/lib");

module.exports = function (app, jwt_secret) {

    /**
     * Login Form data:
     * req.body = {username, password}
     */
    app.content("post.account.login", function (req) {
        /**
         * bước 1: kiểm tra đăng nhập hay chưa
         */
        if (req.cookies.token)
            throw { name: "signed", message: "account_signed" };

        if (req.cookies.wait === "register")
            throw { name: "verify_register", message: "error_verify" };

        /**
         * bước 2: kiểm tra định dạng {login, password}
         */
        return user_validate(req.body, ["login", "password"])
            .then(async function (info) {

                var user, { keys, values } = info;

                /**
                 * bước 3: kiểm tra tài khoản trong database
                 */
                user = await User.findOne({ "login.v": values[keys.login] })
                    .select("_id password verify setting public")
                    .lean();

                if (!user)
                    throw { name: "login", message: "account_not_exists" };

                /**
                 * bước 4: check password
                */
                if (!User.checkPass(values.password, user.password))
                    throw { name: "password", message: "error_password" };

                /**
                 * Nếu tài khoản chưa được xác nhận thì phải xác nhận
                 */
                if (user.verify === "register")
                    throw { name: "login", message: "error_verify" };

                /**
                 * bước 5: Tạo token và gửi xuống client để lưu dưới dạng cookies.token
                 */
                delete user.password;
                delete user.verify;
                return { token: await jwt.sign(user, jwt_secret) };
            });
    });
}