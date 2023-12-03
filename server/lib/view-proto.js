const $notext = "";
const intervals = [
    { label: 'năm', seconds: 31536000 },
    { label: 'tháng', seconds: 2592000 },
    { label: 'ngày', seconds: 86400 },
    { label: 'giờ', seconds: 3600 },
    { label: 'phút', seconds: 60 },
    { label: 'giây', seconds: 0 }
];

module.exports = function (View, Plugin) {

    /**
     * Set/Get site info
     */
    const view_info = {};

    const protoView = [
        ["set", function (k, v) {
            this.__yavi[k] = v;
        }],
        ["get", function (k) {
            return this.__yavi[k];
        }],
        ["page", function () {
            return this.__req.params[0];
        }],
        ["router", function () {
            return this.__req.router.name;
        }],
        ["body_class", function () {
            return this.router() + " " + this.page();
        }],
        ["isspa", function () {
            return this.__req.issocket;
        }],
        ["info", function (key) {
            return View.get_info[key];
        }],
        ["view", function (filename, data) {
            filename = filename.replaceAll(".", "\\");
            if (data) Object.assign(this, data);
            return View.html(`${this.dir}\\view\\${filename}.html`, this);
        }],
        ["hook", function (hook_name) {

            const r = this.__req;

            if (!r._yavi_hook[hook_name]) r._yavi_hook[hook_name] = Plugin.get_hook(hook_name, r);

            return r._yavi_hook[hook_name];
        }],
        ["content", function (content_key) {

            const r = this.__req;

            if (!r._yavi_content[content_key]) r._yavi_content[content_key] = Plugin.get_content(content_key, r);

            return r._yavi_content[content_key];
        }],
        ["data", function (data_key) {

            const r = this.__req;

            if (!r._yavi_data[data_key]) r._yavi_data[data_key] = Plugin.get_data(data_key, r);

            return r._yavi_data[data_key];
        }],
        ["filter", function (filter_key) {

            const r = this.__req;

            if (!r._yavi_filter[filter_key]) r._yavi_filter[filter_key] = Plugin.get_filter(filter_key, r);

            return r._yavi_filter[filter_key];
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
        ["array_to_object", function (array, unique) {

            var obj = {};

            if (unique) {
                for (let i = 0, n = array.length, r; i < n; i++) {
                    r = array[i];
                    obj[r.k] = r.v;
                }
            }
            else {

                for (let i = 0, n = array.length, props = {}, r; i < n; i++) {
                    r = array[i];

                    if (!props[r.k]) {
                        props[r.k] = 1;
                        obj[r.k] = [];
                    }

                    obj[r.k].push(r);
                }
            }

            return obj;
        }],
        ["timeAgo", function (date) {
            var seconds = Math.floor((new Date() - date) / 1000);

            for (var i = 0, counter; i < intervals.length; i++) {
                counter = Math.floor(seconds / intervals[i].seconds);
                if (counter > 0) {
                    if (counter === 1) {
                        return counter + ' ' + intervals[i].label + ' trước'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + intervals[i].label + ' trước'; // plural (2 days ago)
                    }
                }
            }
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