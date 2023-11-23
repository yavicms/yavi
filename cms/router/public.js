const fs = require("fs");
const mime = require("mime-types");
const Plugin = require("yavi/plugin");

const ISTEXT = { css: 1, js: 1 };
const contentType = { css: "text/css", js: "text/javascript" };
const faviconDefault = __dirname + "/../public/image/favicon.ico";

const TaskControllers = {
    admin(response, ext) {
        TaskControllers.common(response, "admin", ext, Plugin.ID.theme);
    },
    main(response, ext) {
        TaskControllers.common(response, "index", ext, Plugin.ID.admin);
    },
    common(response, type, ext, $notid) {

        Plugin.loop(function (plugin, ID) {
            if (ID == $notid) return;

            let $filename = `${plugin.dir}/public/main/${type}.${ext}`;

            if (!fs.existsSync($filename)) return;

            response.write(fs.readFileSync($filename));
        });
    },
    public23(request, response, ext, $filename) {
        /**
         *  Chỉ nhận request GET
         */
        if (request.method !== "get") return response.end();

        let $contentType = mime.contentType(ext);

        if (!fs.existsSync($filename)) return response.end();

        response.setHeader("Content-Type", $contentType);

        if (ISTEXT[ext])
            response.end(fs.readFileSync($filename));
        else
            fs.createReadStream($filename).pipe(response);
    }
};

module.exports = function PublicRouter(plugin) {

    /**
     *	Favicon . ico
     **/
    plugin.router("_0_favicon", "/favicon.ico", function (request, response) {

        /**
         *  Chỉ nhận request GET
         */
        if (request.method !== "get") return response.end();

        response.setHeader("Content-Type", "image/x-icon");

        let $filename = `${Plugin.dir}/public/image/favicon.ico`;
        let filename = !fs.existsSync($filename) ? faviconDefault : $filename;

        fs.createReadStream(filename).pipe(response);
    });

    /**
     *  Public css/js for : cms/admin/theme
     */
    plugin.router("_1_public", "/public/(main|admin)\.(css|js)", function Publicresponse(request, response, type, ext) {

        /**
         *  Chỉ nhận request GET
         */
        if (request.method !== "get") return response.end();

        response.setHeader("Content-Type", contentType[ext]);

        /**
         *  Lấy thông tin những plugin đã kích hoạt
         */
        TaskControllers[type](response, ext);

        response.end();
    });

    /**
     * 	/public/path/to/file.js
     **/
    plugin.router("_2_public", "/public/(admin|theme|plugin)/([a-zA-Z0-9\-]+)/([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})", function (request, response, type, name, path, ext) {

        TaskControllers.public23(request, response, ext, [Plugin.dir, type, name, "public", path + "." + ext].join("/"));
    });

    /**
     * 
     */
    plugin.router("_3_public", "/public/([a-zA-Z0-9\-\/]+)\.([a-z0-9]{1,4})", function (request, response, path, ext) {
        TaskControllers.public23(request, response, ext, Plugin.dir + "/public/" + path + "." + ext);
    });

}