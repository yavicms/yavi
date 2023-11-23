const fs = require("fs");

module.exports = function (Plugin) {

    function active_plugin(type, name, callback) {

        // bước 1: nếu đã tồn tại thì ngừng xử lí
        if (Plugin.info.plugins.has(name)) return;

        // bước 2: active plugin
        Plugin.LoadOne(type, name, function () {

            // bước 3: update file: /project/info.json
            Plugin.info.plugins.add(name);
            Plugin.info.update();

            callback && callback();
        });
    };
    function active_admin_theme(type, name, callback) {

        // bước 1: lấy theme cũ
        let theme = Plugin.get(Plugin.ID[type]);

        // bước 2: nếu đã tồn tại thì ngừng xử lí
        if (name === theme.name) return;

        // bước 3: hủy các cài đặt của theme cũ
        theme.deactive.then(function () {

            // bước 4: active theme mới
            Plugin.LoadOne(type, name, function () {

                // bước 5: update file /project/info.json
                Plugin.info.set(type, name);
                Plugin.info.update();

                callback && callback();
            });

        });
    };
    Object.defineProperty(Plugin, "__active", {
        writable: false,
        value(type, name, callback) {

            if (typeof name !== "string") return;

            switch (type) {
                case "plugin":
                    return active_plugin(type, name, callback);
                case "theme":
                case "admin":
                    return active_admin_theme(type, name, callback);
            }
        }
    });

    Object.defineProperty(Plugin, "__deactive", {
        writable: false,
        value(type, name, callback) {

            if (typeof name !== "string") return;

            // chỉ deactive plugin
            if (type !== "plugin") return;

            // bước 1: lấy thông tin plugin đã active
            let plugin = Plugin.get(type + name);

            // bước 2: nếu chưa tồn tại thì ngừng xử lí
            if (!plugin) return;

            // bước 3: tiến hành hủy các cài đặt của plugin
            plugin.deactive.then(function () {

                // bước 4: update file: /project/info.json
                Plugin.info.plugins.remove(name);
                Plugin.info.update();

                callback && callback();
            });
        }
    });

    Object.defineProperty(Plugin, "update_plugin_list", {
        writable: false,
        value(list, callback) {

            if (typeof list !== "object" || typeof list.length !== "number") return;

            Promise.all([

                // bước 1: cài đặt lại danh sách plugins trong file: /project/info.json
                new Promise(function (success) {
                    Plugin.info.plugins.set(list);
                    Plugin.info.update();
                    success();
                }),

                // bước 2: xóa toàn bộ các plugin events
                Plugin.emit("plugin.reload")

            ]).then(function () {

                // bước 3: tải lại các plugins
                Plugin.Load();

                callback && callback();
            });
        }
    });

    Object.defineProperty(Plugin, "__delete", {
        writable: false,
        value(type, name, callback) {

            if (typeof name !== "string") return;

            let ok, dir;

            // bước 1: nếu đang active thì deactive
            switch (type) {
                case "plugin":
                    Plugin.__deactive(type, name);
                    ok = 1;
                    break;
                case "admin":
                case "theme":
                    // bước 1: lấy theme cũ
                    let theme = Plugin.get(Plugin.ID[type]);
                    // bước 2: hủy các cài đặt của theme cũ
                    if (name === theme.name) {
                        theme.deactive.then(function () {
                            // bước 3: update file /project/info.json
                            Plugin.info.remove(type);
                            Plugin.info.update();
                        });
                    }
                    ok = 1;
                    break;

            }

            if (ok) {
                dir = [Plugin.dir, type, name].join("\\");
                if (fs.existsSync(dir)) {
                    fs.rmSync(dir, { recursive: true, force: true });
                    callback && callback();
                }
            }
        }
    });

};