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

    #$socket = {};
    get socket() {
        let plugin = this;
        return function (action_name, action_callback) {
            plugin.#$socket[action_name] = action_callback;
        }
    }
    get run_socket() {
        let $list = this.#$socket;
        return function (action_name, request, response) {

            if (!request.issocket) return response.status(403).json();

            let action = $list[action_name];

            if (!action)
                response.status(404, "Page not found").json();
            else
                action(request, response, request.body);
        }
    }
    /**
     * Show Public File
     */
    public(filename) {
        return ["/public", this.type, this.name, filename].join("/");
    }

    get deactive() {
        return Promise.all([

            // bước 1: xóa plugin ra khỏi danh sách
            Plugin.remove(this.ID),

            // bước 2: xóa các events của plugin
            Plugin.emit("plugin.remove", this.ID)

        ]);
    }
}
