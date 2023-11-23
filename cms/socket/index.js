const plugin_action = require("./plugin-action");
const admin_new_post = require("./admin-new-post");

module.exports = function (app) {

    /**
     * req: http.request
     * res: socket
     * list: ["name1", "name2"]
     */
    app.socket("plugin-action", function (req, res, data) {
        if (typeof data !== "object") return;

        let action = plugin_action[data.action];

        action && action(data, () => res.json());
    });

    app.socket("admin-new-post", function (req, res, data) {

        admin_new_post(req, res, data, function (message) {
            res.json(message);
        });
    });

};