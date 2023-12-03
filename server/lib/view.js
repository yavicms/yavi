const Plugin = require("yavi/plugin");
const ViewProto = require("./view-proto");
const ViewParser = require("./view-parser");

class View {

    __yavi = {};

    constructor(dirname, req) {
        this.__req = req;
        this.__dir = dirname;
    }
    get dir() {
        return this.__dir;
    }
}

/**
 * View
 */
Object.defineProperty(Plugin.prototype, "view", {
    writable: false,
    value(viewfile, request, data) {
        return (new View(this.dir, request)).view(viewfile, data);
    }
});

ViewParser(View, Plugin);
ViewProto(View, Plugin);

module.exports = View;