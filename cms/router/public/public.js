const { loop } = require('yavi/lib');
const fs = require("fs");
const mime = require("mime-types");
const Plugin = require("yavi/plugin");

const contentType = {
    css: "text/css",
    js: "text/javascript"
};
const yavi_file = __dirname + "/../../public/main/index.js";

function task_common(res, type, ext) {

    var plugin,
        filename,
        $type = "plugin",
        $filename = "/public/main/" + type + "." + ext;

    res.setHeader("Content-Type", contentType[ext]);

    if (plugin = Plugin.get(Plugin.ID[type])) {

        filename = plugin.dir + $filename;

        if (fs.existsSync(filename)) res.write(fs.readFileSync(filename));
    }

    loop(Plugin.info.plugins, function (name) {

        if (plugin = Plugin.get($type + name)) {

            filename = plugin.dir + $filename;

            if (fs.existsSync(filename)) res.write(fs.readFileSync(filename));
        }
    });

    res.end();
}

const Task = {

    "yavi.js": function (res) {
        res.setHeader("Content-Type", contentType.js);
        res.end(fs.readFileSync(yavi_file));
    },
    "account.js": function (res) {
        task_common(res, "account", "js");
    },
    "login.js": function (res) {
        task_common(res, "login", "js");
    },
    "admin.js": function (res) {
        task_common(res, "admin", "js");
    },
    "index.js": function (res) {
        task_common(res, "index", "js");
    },

    "account.css": function (res) {
        task_common(res, "account", "css");
    },
    "login.css": function (res) {
        task_common(res, "login", "css");
    },
    "admin.css": function (res) {
        task_common(res, "admin", "css");
    },
    "index.css": function (res) {
        task_common(res, "index", "css");
    }
};

const reg_plugin = new RegExp("^(admin|theme|plugin)/([a-zA-Z0-9\-]+)/([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})$");
const reg_all = new RegExp("^([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})$");

function send_file(res, filename, ext) {

    res.setHeader("Content-Type", mime.contentType(ext));

    fs.existsSync(filename)
        ? fs.createReadStream(filename).pipe(res)
        : res.end();
}
function check_file(res, path) {

    var exp;

    if (exp = reg_plugin.exec(path)) {
        return send_file(res, [Plugin.dir, exp[1], exp[2], "public/main", exp[3] + "." + exp[4]].join("/"), exp[4]);
    }
    else if (exp = reg_all.exec(path)) {
        return send_file(res, Plugin.dir + "/public/" + exp[1] + "." + exp[2], exp[2]);
    }

    res.end();
};

module.exports = function (req, res) {

    if (req.method === "get") {

        var task = Task[req.params[0]];

        task && task(res) || check_file(res, req.params[0]);
    }
    else {
        res.end();
    }
}