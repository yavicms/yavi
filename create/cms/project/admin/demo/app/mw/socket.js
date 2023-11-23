const App = require("yavi/app");
const Plugin = require("yavi/plugin");
const { loop } = require("yavi/lib");

module.exports = function ($socket, app) {

    /**
     * req: http.request
     * res: socket
     * list: ["name1", "name2"]
     */
    $socket("save-plugin-list", function (req, res, list) {
        let plugins = App.info.plugins;
        console.log(list);
        res.json({ list });
    });

}