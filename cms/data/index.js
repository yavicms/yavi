const get_plugin_list = require("./plugin");
const get_admin_theme_list = require("./theme");

module.exports = function (app) {

    app.data("admin:list:plugin", get_plugin_list);
    app.data("admin:list:theme", get_admin_theme_list);

    app.data("admin:list:posts", function (req) { });
}