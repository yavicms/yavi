const plugin_action = require("./action");

module.exports = function (app) {

    /**
     * url: /api/plugin-action
     * body: { type: "plugin/admin/theme", name: ["name1", "name2"] }
     */
    app.api("post", "plugin-action", function (req, res) {

        let data = req.body || {};
        let action = plugin_action[data.action];

        action && action(data, () => res.json());
    });

}