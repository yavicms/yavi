const UserForm = require('../form');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(13);

module.exports = function (User) {

    Object.defineProperty(User, "hashPass", {
        writable: false,
        value(password) {
            return bcrypt.hashSync(password, salt);
        }
    });

    Object.defineProperty(User, "checkPass", {
        writable: false,
        value(input, output) {
            return bcrypt.compareSync(input, output);
        }
    });

    Object.defineProperty(User, "makeCode", {
        writable: false,
        value() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
    });

    Object.defineProperty(User, "Add", {
        writable: false,
        value: async function (body) {
            try {
                let form = new UserForm(body);
                let user = new User(form.register),
                    $user;

                if ($user = await user.save()) {
                    return $user;
                }
                else {
                    throw { name: "login", message: "account_exists" };
                }
            }
            catch (error) {
                throw { name: "login", message: "account_exists" };
            }
        }
    });

};