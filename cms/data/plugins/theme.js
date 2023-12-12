const fs = require("fs");
const { loop } = require("yavi/lib");
const Plugin = require("yavi/plugin");
const Type = { admins: "admin", themes: "theme" };

/**
 * Lấy thông tin của các themes trong thư mục : /project/theme
 */

module.exports = function get_admin_theme_list(req) {

    return new Promise(function (success) {

        let type = Type[req.params[0]],
            plugindir = [Plugin.dir, type, ""].join("/"),
            name = Plugin.info.get(type),
            plugins = [];

        if (!fs.existsSync(plugindir)) return success(plugins);

        loop(fs.readdirSync(plugindir), function (plugin_name) {
            let info = Plugin.json(plugindir + plugin_name + "/info.json");

            info.type = type;
            info.name = plugin_name;
            info.active = name === info.name;
            info.screenshot = ["/public", type, plugin_name, "image/screenshot.jpg"].join("/");

            info.active ? plugins.unshift(info) : plugins.push(info);
        });

        success(plugins);
    });
};