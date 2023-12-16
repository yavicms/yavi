const fs = require("fs");
const Plugin = require("yavi/plugin");

/**
 * Lấy thông tin của các plugins trong thư mục : /project/plugin
 */
module.exports = function get_plugin_list(req) {

    return new Promise(function (success) {

        var plugindir = Plugin.dir + "/plugin/",
            data = {
                type: "plugin",
                status: req.query.list,
                count: { all: 0, active: 0, deactive: 0 },
                list: []
            },
            files, add;

        switch (data.status) {
            case "active":
                add = function (info) {
                    if (info.active) {
                        ++data.count.active;
                        data.list.push(info);
                    }
                };
                break;

            case "noactive":
                add = function (info) {
                    info.active
                        ? ++data.count.active
                        : data.list.push(info);
                };
                break;

            default:
                data.status = "all";
                add = function (info) {
                    if (info.active) ++data.count.active;
                    data.list.push(info);
                };
                break;
        }

        if (fs.existsSync(plugindir)) {

            files = fs.readdirSync(plugindir);
            data.count.all = files.length;

            for (var i = 0; i < data.count.all; i++) {
                var plugin_name = files[i],
                    info = Plugin.json(plugindir + plugin_name + "/info.json");

                info.type = "plugin";
                info.name = plugin_name;
                info.active = Plugin.has(info.type + info.name);

                add(info);
            }

            data.count.deactive = data.count.all - data.count.active;
        }

        success(data);
    });
};