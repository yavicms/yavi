const $notext = "";

module.exports = function (View, Plugin) {

    /**
     * Set/Get site info
     */
    const view_info = {};

    const protoView = [
        ["router", function () {
            return this.__request.router.name;
        }],
        ["public", function (filename) {
            return ["/public", this.__yavi.type, this.__yavi.name, filename].join("/");
        }],
        ["view", function (filename, data) {
            filename = filename.replaceAll(".", "\\");
            if (data) Object.assign(this, data);
            return View.html(`${this.__yavi.dir}\\view\\${filename}.html`, this);
        }],
        ["hook", function (hook_name) {

            let r = this.__request;

            if (!r.yavi_hook[hook_name]) r.yavi_hook[hook_name] = Plugin.get_hook(hook_name, r).then(x => x.join(""));

            return r.yavi_hook[hook_name];
        }],
        ["content", function (content_key) {

            let r = this.__request;

            if (!r.yavi_content[content_key]) r.yavi_content[content_key] = Plugin.get_content(content_key, r);

            return r.yavi_content[content_key];
        }],
        ["data", function (data_key) {

            let r = this.__request;

            if (!r.yavi_data[data_key]) r.yavi_data[data_key] = Plugin.get_data(data_key, r);

            return r.yavi_data[data_key];
        }],
        ["menu", function (menu_key) {

            let r = this.__request;

            if (!r.yavi_menu) r.yavi_menu = {};
            if (!r.yavi_menu[menu_key]) r.yavi_menu[menu_key] = Plugin.get_menu(menu_key);

            return r.yavi_menu[menu_key];
        }],
        ["map", function map(object, callback) {

            if (typeof object === "object") {

                if (typeof object.then === "function")
                    return object.then(($data) => map($data, callback));

                let arr = [], data;

                for (let key in object) {
                    if (data = callback(object[key], key)) arr.push(data);
                }

                return Promise.all(arr).then(r => r.join($notext));
            }
        }],
        ["info", function (key) {
            return View.get_info[key];
        }]
    ];

    const staticView = [
        ["add_info", function (key, value) {
            view_info[key] = value;
        }],
        ["get_info", function (key) {
            return view_info[key];
        }],
        ["delete_info", function (key) {
            delete view_info[key];
        }]
    ];

    protoView.forEach(function (row) {
        Object.defineProperty(View.prototype, row[0], { writable: false, value: row[1] });
    });
    staticView.forEach(function (row) {
        Object.defineProperty(View, row[0], { writable: false, value: row[1] });
    });

};