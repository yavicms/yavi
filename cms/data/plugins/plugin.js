const fs = require("fs");
const { loop } = require("yavi/lib");
const Plugin = require("yavi/plugin");

/**
 * Lấy thông tin của các plugins trong thư mục : /project/plugin
 */
module.exports = function get_plugin_list(req) {

    return new Promise(function (success) {

        let plugindir = Plugin.dir + "/plugin/",
            data = {
                count_all: 0,
                count_active: 0,
                count_deactive: 0,
                list: []
            },
            gettype = req.query.list;

        if (!fs.existsSync(plugindir)) return success([]);

        loop(fs.readdirSync(plugindir), function (plugin_name) {
            let info = Plugin.json(plugindir + plugin_name + "/info.json");

            info.type = "plugin";
            info.name = plugin_name;
            info.active = Plugin.has(info.type + info.name);

            if (info.active) ++data.count_active;
            ++data.count_all;

            switch (gettype) {
                case "active":
                    if (info.active) data.list.push(info);
                    break;

                case "noactive":
                    if (!info.active) data.list.push(info);
                    break;

                default:
                    data.list.push(info);
                    break;
            }

        });

        data.count_deactive = data.count_all - data.count_active;

        success(data);
    });
};