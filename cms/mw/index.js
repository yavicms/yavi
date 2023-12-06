const Plugin = require('yavi/plugin');
const cookieParser = require('cookie-parser');
const bodyParser = require('./body-parser');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    const jwt_secret = Plugin.info.jwt_secret;

    /**
     * body-parser
     */
    app.use(bodyParser);

    /**
     * cookie-parser
     */
    app.use(cookieParser());

    /**
     * check login
     */
    app.use("api", async function (req, res, next) {

        if (req.User) return next();

        if (req.cookies.token) {
            let user = await jwt.verify(req.cookies.token, jwt_secret);

            if (user) {
                req.User = user;
                next();
                return;
            }
        }

        res.error("error_signed_token");
    });

    app.use("admin", async function (req, res, next) {

        if (req.User) return next();

        if (req.cookies.token) {
            let user = await jwt.verify(req.cookies.token, jwt_secret);

            if (user) {
                req.User = user;
                next();
                return;
            }
        }

        res.admin("login");
    });
}