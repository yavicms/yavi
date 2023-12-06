const plugin_action = require("./action");

module.exports = function (app) {

    /**
     * url: /api/plugin-action
     * body: { type: "plugin/admin/theme", name: ["name1", "name2"] }
     */
    app.content("post.api.plugin-action", function (req) {

        let data = req.body || {};
        let action = plugin_action[data.action];

        return new Promise((success) => action && action(data, success));
    });

}