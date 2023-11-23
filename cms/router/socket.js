const Plugin = require("yavi/plugin");

module.exports = function (req, res, ID, action) {

    if (!req.issocket) return res.status(403).json();

    let plugin = Plugin.get(ID);

    if (!plugin) return res.status(403, "error").json();

    plugin.run_socket(action, req, res);
}