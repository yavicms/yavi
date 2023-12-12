const User = require('yavi/db/mongo/users');
const { user_validate } = require('yavi/lib');

module.exports = function (app, jwt_secret) {

    /**
     * Tạo tài khoản mới
     * req.body = {firstname, lastname, email, password}
     */
    app.content("put.account.register", async function (req) {

        /**
         * bước 1: Kiểm tra đã đăng nhập hay chưa, nếu rồi thì ngừng xử lí
         */
        if (req._yavi_signed)
            throw { name: "login", message: "account_signed" };

        /**
         * Kiểm tra các thông tin đăng kí
         */
        return user_validate(req.body, [
            "fullname",
            "login",
            "password"
        ])
            .then(async function (result) {

                var { keys, values } = result;

                /**
                 * Tạo mã xác thực tài khoản
                 */
                values.code = Math.floor(100000 + Math.random() * 900000).toString();
                values.verify = "register";
                values.password = User.hashPass(values.password);

                /**
                 * Thêm dữ liệu vào database
                 */

                return User.Add(values)
                    .then(function (user) {
                        /**
                         * Gửi email hoặc số điện thoại về mã xác nhận đăng kí
                         */

                        /**
                         * Gửi thông tin user {login,wait(register)} xuống trình duyệt
                         * để xác nhận việc đăng kí
                         */
                        return { login: values[keys.login], verify: "register" };
                    });
            });
    });
}