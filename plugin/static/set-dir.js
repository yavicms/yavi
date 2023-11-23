const fs = require("fs");
const { loop, remove } = require("yavi/lib");
const no_update = { mongodb: 1, redis: 1, server: 1, plugins: 1 };

module.exports = function (Plugin) {

    let project_dir, file_info, project_info_data;

    let project_info = {
        plugins: {
            all() {
                return project_info_data.plugins;
            },
            has(name) {
                return project_info_data.plugins.indexOf(name) + 1 > 0;
            },
            add(name) {
                project_info_data.plugins.push(name);
            },
            set(list) {
                project_info_data.plugins = list;
            },
            remove(name) {
                loop(project_info_data.plugins, function ($name, $index) {
                    if (name === $name) {
                        project_info_data.plugins.splice($index, 1);
                        return 1;
                    }
                });
            }
        },
        get server() {
            return project_info_data.server;
        },
        get mongodb() {
            return project_info_data.mongodb;
        },
        get redis() {
            return project_info_data.redis;
        },
        get dev() {
            return project_info_data.dev;
        },
        get websocket() {
            return project_info_data.websocket;
        },

        set dev(isdev) {
            project_info_data.dev = isdev;
        },

        get set() {
            return function (key, value) {
                if (!no_update[key]) project_info_data[key] = value;
            }
        },
        get get() {
            return function (key) {
                return project_info_data[key];
            }
        },
        get remove() {
            return function (key) {
                if (!no_update[key]) delete project_info_data[key];
            }
        },

        get update() {
            return function () {
                fs.writeFileSync(file_info, JSON.stringify(project_info_data, null, "\t"));
            }
        }
    };

    Object.defineProperties(Plugin, {

        setDir: {
            writable: false,
            value(dir) {
                project_dir = dir;
                file_info = dir + "/info.json";
                project_info_data = JSON.parse(fs.readFileSync(file_info));
            }
        },

        dir: {
            get() {
                return project_dir;
            }
        },

        info: {
            get() {
                return project_info;
            }
        },

        json: {
            writable: false,
            value(filename, callback) {
                try {
                    let data = JSON.parse(fs.readFileSync(filename));
                    if (!callback) return data;
                    if (data) fs.writeFileSync(filename, JSON.stringify(callback(data), null, "\t"));
                }
                catch (e) { }
            }
        }
    });
}