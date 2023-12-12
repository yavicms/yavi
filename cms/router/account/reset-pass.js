const jwt = require('jsonwebtoken');
const User = require('yavi/db/mongo/users');
const { user_validate } = require('yavi/lib');

module.exports = function (app, jwt_secret) {

    /**
     * Quên mật khẩu
     * req.body = {login, code, password, repassword}
     */
    app.content("post.account.forgot", function (req) {

        /**
         * Kiểm tra form nhập hợp lệ
         */
        return user_validate(req.body, ["login", "code", "password"])
            .then(async function (info) {

                var user, { keys, values } = info;

                /**
                 * 2 mật khẩu phải trùng khớp với nhau
                 */
                if (req.body.password !== values.password)
                    throw { name: "repassword", message: "" };

                user = User.findOneAndUpdate(
                    { "login.v": values[keys.login], "code": values.code },
                    {
                        $unset: { code: 1, verify: 1 },
                        $set: { password: User.hashPass(values.password) }
                    },
                    { new: true, upsert: false }

                ).select("_id setting public");

                if (user) {
                    return { token: await jwt.sign(user, jwt_secret) };
                }
                else {
                    throw { name: "code", message: "error_code" };
                }
            });
    });
};