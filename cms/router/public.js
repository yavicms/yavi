const fs = require("fs");
const mime = require("mime-types");
const Plugin = require("yavi/plugin");

const ISTEXT = { css: 1, js: 1 };
const contentType = { css: "text/css", js: "text/javascript" };
const faviconDefault = __dirname + "/../public/image/favicon.ico";

const TaskControllers = {
    admin(res, ext) {
        TaskControllers.common(res, "admin", ext, Plugin.ID.theme);
    },
    main(res, ext) {
        TaskControllers.common(res, "index", ext, Plugin.ID.admin);
    },
    common(res, type, ext, $notid) {

        Plugin.loop(function (plugin, ID) {
            if (ID == $notid) return;

            let $filename = `${plugin.dir}/public/main/${type}.${ext}`;

            if (!fs.existsSync($filename)) return;

            res.write(fs.readFileSync($filename));
        });
    },
    public23(req, res, ext, $filename) {

        let $contentType = mime.contentType(ext);

        if (!fs.existsSync($filename)) return res.end();

        res.setHeader("Content-Type", $contentType);

        if (ISTEXT[ext])
            res.end(fs.readFileSync($filename));
        else
            fs.createReadStream($filename).pipe(res);
    }
};

module.exports = function PublicRouter(app) {

    /**
     *	Favicon . ico
     **/
    app.router(
        "_0_favicon",
        "/favicon.ico",
        function (req, res) {
            res.setHeader("Content-Type", "image/x-icon");

            let $filename = `${Plugin.dir}/public/image/favicon.ico`;
            let filename = !fs.existsSync($filename) ? faviconDefault : $filename;

            fs.createReadStream(filename).pipe(res);
        });

    /**
     *  Public css/js for : cms/admin/theme
     */
    app.router(
        "_1_public",
        "/public/(main|admin)\.(css|js)",
        function (req, res, type, ext) {

            res.setHeader("Content-Type", contentType[ext]);

            /**
             *  Lấy thông tin những plugin đã kích hoạt
             */
            TaskControllers[type](res, ext);

            res.end();
        });

    /**
     * 	/public/path/to/file.js
     **/
    app.router(
        "_2_public",
        "/public/(admin|theme|plugin)/([a-zA-Z0-9\-]+)/([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})",
        (req, res, type, name, path, ext) => TaskControllers.public23(req, res, ext, [Plugin.dir, type, name, "public", path + "." + ext].join("/")));

    /**
     * 
     */
    app.router(
        "_3_public",
        "/public/([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})",
        (req, res, path, ext) => TaskControllers.public23(req, res, ext, Plugin.dir + "/public/" + path + "." + ext));

}