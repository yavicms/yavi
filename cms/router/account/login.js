const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('yavi/db/mongo/users');

module.exports = function (app, jwt_secret, validate, $notext) {

    /**
     * Login Form data:
     * req.body = {username, password}
     */
    app.content("post.account.login", async function (req) {
        try {
            /**
             * bước 1: kiểm tra đăng nhập hay chưa
             */
            if (req.cookies.token) throw new Error("account_signed");

            /**
             * bước 2: kiểm tra định dạng {username, password}
             */
            let username = req.body.username || $notext,
                password = req.body.password || $notext,
                user, error_message;

            if (!validate.username(username)) throw new Error("error_login");
            if (!validate.password(password)) throw new Error("error_password");

            /**
             * bước 3: kiểm tra tài khoản trong database
             */
            if (user = await User.findOne({ "props.v": username })
                .select("_id username name password thumb setting")
                .lean()) {

                /**
                 * bước 4: check password
                 */
                if (bcrypt.compareSync(password, user.password)) {

                    /**
                     * bước 5: Tạo token và gửi xuống client để lưu dưới dạng cookies.token
                     */
                    delete user.password;
                    return { token: await jwt.sign(user, jwt_secret) };
                }
                else {
                    error_message = "error_password";
                }
            }
            else {
                error_message = "error_account_exists";
            }

            throw new Error(error_message);
        }
        catch (error) {
            throw error;
        }
    });
}