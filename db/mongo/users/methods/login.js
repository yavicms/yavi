const { is } = require('yavi/lib');
const isValue = function (value) {
    return is.string(value) && /^[^\s\t\n]{2,100}$/.test(value)
};

module.exports = function Login(schema, model) {

    /**
     * Đăng nhập tài khoản
     * Đầu vào: info: { type [email, phone], value, password }
     */
    schema.method("Login", async function (info) {

        try {

            let error_message, user;

            if (!is.object(info)) {
                error_message = "user_input_typeof";
            }
            else if (!isValue(info.value)) {
                error_message = "user_info_value";
            }
            else if (!is.password(info.password)) {
                error_message = "user_info_password";
            }
            else {

                if (user = await model.findOne({
                    "login.v": info.value,
                    "login.k": { "$in": ["email", "phone", "username"] }
                })) {

                    if (validatePass = await bcrypt.compare(info.password, user.password)) {
                        return user;
                    }
                    else {
                        error_message = "user_info_password";
                    }
                }
                else {
                    error_message = "user_not_found";
                }
            }

            throw new Error(error_message);

        } catch (error) {
            throw new Error(error.message);
        }
    });
}