const fs = require("fs");
const Plugin = require("yavi/plugin");
const faviconDefault = __dirname + "/favicon.ico";

module.exports = function (req, res) {

    res.setHeader("Content-Type", "image/x-icon");

    if (req.method === "get") {

        let $filename = `${Plugin.dir}/public/image/favicon.ico`;
        let filename = fs.existsSync($filename) ? $filename : faviconDefault;

        fs.createReadStream(filename).pipe(res);
    }
    else {
        res.end();
    }
}