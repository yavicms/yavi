const { loop, is } = require("yavi/lib");
const fs = require("fs");

module.exports = function (Plugin) {

    let list_plugin = {};

    Object.defineProperties(Plugin, {
        "has": {
            writable: false,
            value(ID) {
                return undefined !== list_plugin[ID];
            }
        },
        "get": {
            writable: false,
            value(ID) {
                return list_plugin[ID];
            }
        },
        "loop": {
            writable: false,
            value(callback) {
                loop(list_plugin, callback);
            }
        },
        "themedir": {
            get() {
                return (list_plugin[Plugin.ID.theme] || list_plugin[Plugin.ID.cms]).dir;
            }
        },
        "admindir": {
            get() {
                return (list_plugin[Plugin.ID.admin] || list_plugin[Plugin.ID.cms]).dir;
            }
        },
        "Load": {
            writable: false,
            value() {

                list_plugin = {};

                /**
                 * bước 1: khởi động CMS
                 */
                require("yavi/cms")(new Plugin("cms", "yavi"));

                /**
                 * bước 2: khởi động admin
                 */
                this.LoadOne("admin", Plugin.info.get("admin"), null, 1);

                /**
                 * bước 3: khởi động theme
                 */
                this.LoadOne("theme", Plugin.info.get("theme"), null, 1);

                /**
                 * bước 4: khởi động plugins
                 */
                loop(Plugin.info.plugins.all(), (plugin_name) => this.LoadOne("plugin", plugin_name, null, 1));
            }
        },
        "LoadOne": {
            writable: false,
            value(type, name, callback, isnew) {

                if (is.plugin(type + name)) {

                    /**
                     *  filename : /project/plugin/name/index.js
                     */
                    let filename = [Plugin.dir, type, name, "index.js"].join("/");

                    if (fs.existsSync(filename)) {

                        /**
                         * Xóa dữ liệu cache của plugin cũ
                         */
                        if (!isnew) delete require.cache[require.resolve(filename)];

                        /**
                         * Load plugin mới
                         */
                        require(filename)(new Plugin(type, name));

                        /**
                         * 
                         */
                        callback && callback();
                    }
                }
            }
        },

        "add": {
            writable: false,
            value(plugin) {
                list_plugin[plugin.ID] = plugin;
            }
        },

        "remove": {
            writable: false,
            value(ID) {
                delete list_plugin[ID];
            }
        }
    });
};