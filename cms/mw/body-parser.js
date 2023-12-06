const App = require('yavi/plugin');

module.exports = function bodyParser(req, res, next) {
    if (req.method === "get" || req.issocket) return next();

    switch (req.x_yavi_type) {
        case "json":
            var text = "";
            req.on("data", (chunk) => text += chunk);
            req.on("end", function () {
                try {
                    req.body = JSON.parse(text);
                    next();
                } catch (error) {
                    res.error(error);
                    App.error("body-parser-request", __filename, error);
                }
            });
            break;

        default:
            next();
            break;
    }

    req.on("error", function (error) {
        res.error(error);
        App.error("body-parser-request", __filename, error);
    });
}