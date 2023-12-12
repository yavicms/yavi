const User = require('yavi/db/mongo/users');
const { user_validate } = require('yavi/lib');

module.exports = function (app) {

    /**
     * Quên mật khẩu
     * req.body = {login}
     */
    app.content("post.account.forgot", function (req) {

        /**
         * Kiểm tra form nhập hợp lệ
         */
        return user_validate(req.body, ["login"])
            .then(async function (info) {

                var user, { keys, values } = info,

                    /**
                     * Tạo mã xác thực tài khoản
                     */
                    $set = {
                        code: User.makeCode(),
                        verify: "forgot"
                    };

                /**
                 * Xác nhận tồn tại User với req.body.login
                 */
                user = await User.findOneAndUpdate({ "login.v": values[keys.login] }, { $set })
                    .select("_id code setting public")
                    .lean();

                if (!user) throw { name: "login", message: "account_not_exists" };

                /**
                 * Gửi mã xác nhận đến email/phone
                 */

                /**
                 * Gửi thông tin để set cookie
                 */
                return { verify: $set.verify };
            });
    });
}