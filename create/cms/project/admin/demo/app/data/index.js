const App = require("yavi/app");
const Plugin = require("yavi/plugin");
const { loop } = require("yavi/lib");
const fs = require("fs");

module.exports = function AdminData(data, app) {

    /**
     * Lấy danh sách các đường dẫn Link của sidebar
     */
    data("admin:sidebar:link", function (req) {
        return App.readFile(__dirname + "/sidebar-link.json");
    });

    /**
     * Lấy thông tin của các plugins trong thư mục : /project/plugin
     */
    data("admin:plugin", function (req) {

        return new Promise(function (success, error) {

            let plugindir = App.dir + "/plugin/", plugins = [];

            if (!fs.existsSync(plugindir)) return success([]);

            loop(fs.readdirSync(plugindir), function (plugin_name) {
                try {
                    let dir = plugindir + plugin_name;
                    let info = App.readFile(dir + "/info.json");

                    info.type = "plugin";
                    info.name = plugin_name;
                    info.id = Plugin.getID(info.type, info.name);
                    info.dir = dir;
                    info.active = !!App.info.plugins[info.id];

                    plugins.push(info);
                }
                catch (e) { }
            });

            success(plugins);

        });
    });

};