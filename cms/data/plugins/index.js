const get_plugin_list = require("./plugin");
const get_admin_theme_list = require("./theme");

module.exports = function (app) {

    app.data("admin:plugins:plugin", get_plugin_list);
    app.data("admin:plugins:theme", get_admin_theme_list);
}