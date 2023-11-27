module.exports = class Plugin {

    #$data = {};

    constructor(type, name) {

        this.#$data.dir = [Plugin.dir, type, name].join("/");
        this.#$data.type = type;
        this.#$data.name = name;
        this.#$data.ID = Plugin.getID(type, name);

        Plugin.add(this);
    }

    set dir(dir) {
        if (this.type === "cms") this.#$data.dir = dir;
    }
    get type() {
        return this.#$data.type;
    }
    get name() {
        return this.#$data.name;
    }
    get ID() {
        return this.#$data.ID;
    }
    get dir() {
        return this.#$data.dir;
    }
}