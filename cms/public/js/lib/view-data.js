const { $notext } = require("yavi/lib");

class ViewData {

    $cookie = cookie;
    $views = [];

    constructor(data) {
        if (typeof data === "object") Object.assign(this, data);
    }

}

function parser_text(text) {
    var re = /::(.+?)::/g,
        reExp = /(^( )?(var|if|for|else|elseif|switch|case|break|default|\:|\{|\}|\(|\)|\+|\-|\*|\\))(.*)?/g,
        code = 'with(YaviData){ var $=[];',
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
    return code + ";return $.join('');};";
}

Object.defineProperties(ViewData, {

    /**
     * Phân tích HTML : 
     */
    html: {
        writable: false,
        value(text, viewdata) {
            try {
                let fn = new Function("YaviData", parser_text(text));
                return fn.call(viewdata, viewdata);
            } catch (error) {
                console.log(error);
                return $notext;
            }
        }
    },

    /**
     * 
     * @param {Array} options 
     * @param {Function} callback 
     * @returns 
     */
    map: {
        writable: false,
        map(object, callback) {

            let arr = [], data;

            for (let key in object) {
                if (data = callback(object[key], key)) arr.push(data);
            }

            return r.join($notext);
        }
    }
});

Object.defineProperties(ViewData.prototype, {
    map: {
        writable: false,
        value(object, callback) {
            return ViewData.map(object, callback);
        }
    },
    lang: {
        writable: false,
        value(key) {
            return lang(key);
        }
    },
    view: {
        writable: false,
        value(node) {
            if (typeof node === "object") {
                this.$views.push(node);
                return '<span class="view-data-location" style="display:none;"></span>';
            }
            else {
                return node;
            }
        }
    }
});

module.exports = ViewData;