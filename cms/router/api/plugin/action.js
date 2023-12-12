const Plugin = require("yavi/plugin");

module.exports = {
    save(data, callback) {
        Plugin.update_plugin_list(data.name, callback);
    },
    delete(data, callback) {
        Plugin.__delete(data.type, data.name, callback);
    },
    active(data, callback) {
        Plugin.__active(data.type, data.name, callback);
    },
    deactive(data, callback) {
        if (data.type !== "plugin") return;
        Plugin.__deactive(data.type, data.name, callback);
    }
};