const Plugin = require("yavi/plugin");
const ViewProto = require("./view-proto");
const ViewParser = require("./view-parser");

class View {

    __request = {};
    __yavi = {};

    constructor(dirname, request) {
        this.__request = request;
        this.#setDir(dirname);
    }
    #setDir(dirname) {
        let keys = dirname.split("\\"), n = keys.length - 1;

        this.__yavi.dir = dirname;

        this.__yavi.type = keys[(n - 1)];
        this.__yavi.name = keys[n];
    }

    page() {
        return this.__request.params[0] || "home";
    }
    body_class() {
        return [this.router(), this.page()].join(" ");
    }
    isspa() {
        return this.__request.issocket || this.__request.isajax;
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