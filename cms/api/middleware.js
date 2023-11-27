const App = require('yavi/plugin');
const methods = { put: 1, post: 1, delete: 1 };

module.exports = function (app) {

    /**
     * body-parser
     */
    app.use("api", function (req, res, next) {
        if (req.issocket || !methods[req.method]) return next();

        let text = "";

        req.on("data", function (chunk) {
            text += chunk;
        });

        req.on("end", function () {
            try {
                req.body = JSON.parse(text);
                next();
            } catch (error) {
                res.error(error).json();
                App.error("body-parser-request", __filename, error);
            }
        });

        req.on("error", function (error) {
            res.error(error).json();
            App.error("body-parser-request", __filename, error);
        });
    });
}