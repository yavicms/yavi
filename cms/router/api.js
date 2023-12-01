const Plugin = require("yavi/plugin");

module.exports = function (app) {

    app.router("api", "/api/([a-z0-9\-]+)", function (req, res, path) {

        return Plugin.get_api(req.method, path, req)
            .then(data => res.json(data))
            .catch(err => res.status(404, err.message).json());
    });
};