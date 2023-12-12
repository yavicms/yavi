const jwt = require('jsonwebtoken');
const Plugin = require('yavi/plugin');

module.exports = function check_token(callback) {

    const jwt_secret = Plugin.info.jwt_secret;

    return async function (req, res, next) {

        var token, user;

        if (token = req.cookies.token) {
            if (user = await jwt.verify(req.cookies.token, jwt_secret)) {
                req.User = user;
                req._yavi_signed = 1;
                return next();
            }
        }
        callback(req, res, next);
    }
}