const App = require('yavi/plugin');

function bodyParser(req, res, next) {
    if (req.issocket) return next();

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
}

module.exports = function (app) {

    /**
     * body-parser
     */
    app.put(bodyParser);
    app.post(bodyParser);
    app.delete(bodyParser);
}