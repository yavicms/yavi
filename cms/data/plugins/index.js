const get_plugin_list = require("./plugin");
const get_admin_theme_list = require("./theme");

module.exports = function (app) {

    app.data("admin.plugins", get_plugin_list);
    app.data("admin.themes", get_admin_theme_list);
}