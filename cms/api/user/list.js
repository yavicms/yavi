const User = require('yavi/db/mongo/users');

module.exports = function (req) {
    return User.List(req);
}