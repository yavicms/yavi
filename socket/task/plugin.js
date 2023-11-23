const Plugin = require("yavi/plugin");

module.exports = function socketPlugin(socket) {
    socket.on("plugin", function (options) {
        let ID = Plugin.getID(options.type, options.name);
        let plugin = Plugin.get(ID);

        if (plugin) plugin.run_socket(options.action, options.data, socket);
    });
}