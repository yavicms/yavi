const UserForm = require('yavi/db/mongo/users/form');

module.exports = function (User) {

    Object.defineProperty(User, "Add", {
        writable: false,
        value: async function (body) {
            try {
                let form = new UserForm(body);
                let user = new User(form.data);

                return await user.save();

            } catch (error) {
                throw error;
            }
        }
    });

};