const fs = require('fs');
const plugin = require('yavi/plugin');

module.exports = function (req, res) {

    var filename = [plugin.dir, "lang", req.params[0]].join("/");

    res.setHeader("Content-Type", "text/javascript");

    res.write("(function(){const $langs = ");

    res.write(fs.existsSync(filename) ? fs.readFileSync(filename) : "{}");

    res.end(";Object.defineProperty(window, 'lang', {writable:false, value(key){ return $langs[key] || key; }});})();");
}

