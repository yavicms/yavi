const User = require('yavi/db/mongo/users');

/**
 * Thêm bài viết mới:
 * body: { email, firstname, lastname, password }
 */
module.exports = function (req) {
    return User.Add(req.body);
}