const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('yavi/db/mongo/users');

module.exports = function (app, jwt_secret, validate, $notext) {

    /**
     * Quên mật khẩu
     * req.body = {email,username,phone}
     */
    app.content("post.account.forgot", async function (req) {
        try { }
        catch (error) { }
    });
}