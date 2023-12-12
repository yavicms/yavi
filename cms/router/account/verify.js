const jwt = require('jsonwebtoken');
const User = require('yavi/db/mongo/users');
const { user_validate } = require('yavi/lib');

module.exports = function (app, jwt_secret) {

    /**
     * Xác thực tài khoản hợp lệ
     * req.body = {code, login}
     */
    app.content("post.account.verify", function (req) {

        /**
         * Kiểm tra form nhập hợp lệ
         */
        return user_validate(req.body, ["login", "code"])
            .then(async function (info) {

                var user, updated, { keys, values } = info;

                /**
                 * Xác nhận tồn tại User với req.body.login
                 */
                user = await User.findOne({ "login.v": values[keys.login] })
                    .select("_id code setting public")
                    .lean();

                if (!user) throw { name: "login", message: "account_not_exists" };
                if (!user.code) throw { name: "error", message: "unknown" };
                if (user.code !== values.code) throw { name: "code", message: "error_code" };

                updated = await User.updateOne({ _id: user._id }, { $unset: { code: 1, verify: 1 } });
                if (!updated) throw { name: "error", message: "unknown" };

                /**
                 * Tạo token đăng nhập
                 */
                delete user.code;
                return { token: await jwt.sign(user, jwt_secret) };
            });
    });
};