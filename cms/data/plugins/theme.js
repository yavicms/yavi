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
            $name = Plugin.info.get(type),
            data = {
                type: "theme",
                count: { all: 0, active: 0, deactive: 0 },
                list: []
            };

        if (!fs.existsSync(plugindir)) return success(data);

        loop(fs.readdirSync(plugindir), function (name) {
            let info = Plugin.json(plugindir + name + "/info.json");

            info.type = type;
            info.name = name;
            info.active = $name === info.name;
            info.screenshot = ["/public", type, name, "image/screenshot.jpg"].join("/");

            info.active ? data.list.unshift(info) : data.list.push(info);
        });

        success(data);
    });
};