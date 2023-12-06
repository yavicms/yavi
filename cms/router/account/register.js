const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('yavi/db/mongo/users');

module.exports = function (app, jwt_secret, validate, $notext) {

    /**
     * Tạo tài khoản mới
     * req.body = {firstname, lastname, email}
     */
    app.content("put.account.register", async function (req) {
        try { }
        catch (error) { }
    });
}