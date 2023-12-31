const fs = require("fs");
const { is } = require("yavi/lib");

const $notext = "";

module.exports = function (View, Plugin) {
    /**
     * Phân tích HTML : 
     */
    let TextView = {};

    function Parser(text) {
        var re = /::(.+?)::/g,
            reExp = /(^( )?(var|if|for|else|elseif|switch|case|break|default|\:|\{|\}|\(|\)|\+|\-|\*|\\))(.*)?/g,
            code = 'with(YaviData){ let $=[];',
            cursor = 0,
            match;
        var add = function (line, js) {
            js ? code += line.match(reExp) ? line : "$.push(" + line + ");" : code += line != $notext ? "$.push('" + line.replace(/'/g, '&#39') + "');" : $notext;
            return add;
        };
        while (match = re.exec(text)) {
            add(text.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        };
        add(text.substr(cursor, text.length - cursor));
        return code + "return Promise.all($).then($r => $r.join('')).catch($e => console.log($e));};";
    };

    function Text(path) {
        if (is.undefined(TextView[path]))
            TextView[path] = fs.existsSync(path)
                ? fs.readFileSync(path, "utf8")
                    .replace(/[\n\r\t]/g, $notext)
                    .replace(/\s{2,}/g, $notext)
                : $notext;

        return TextView[path];
    };

    Object.defineProperty(View, "reset", {
        writable: false,
        value() {
            if (Plugin.info.dev) TextView = {};
        }
    });

    Object.defineProperty(View, "html", {
        writable: false,
        value(path, view) {
            try {
                let fn = new Function("YaviData", Parser(Text(path)));
                return fn.call(view, view);
            } catch (error) {
                // App.error("View.html", __filename, error);
                return Promise.reject(error.toString());
            }
        }
    });
};
