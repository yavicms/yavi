const Plugin = require("yavi/plugin");

module.exports = function (req, res, path) {

    Plugin.get_api(req.method, path, req)
        .then(data => res.json(data))
        .catch(err => res.status(404, err.message).json());
};