const $notext = "";
const { loop } = require("yavi/lib");

module.exports = class ViewData {

    /**
     * Phân tích HTML : 
     */
    static html(text, view) {
        try {
            let fn = new Function("YaviData", this.#parser(text));
            return fn(view);
        } catch (error) {
            console.log(error);
            return $notext;
        }
    }
    static #parser(text) {
        var re = /\{\%(.+?)\%\}/g,
            reExp = /(^( )?(var|if|for|else|elseif|switch|case|break|default|\:|\{|\}|\(|\)|\+|\-|\*|\\))(.*)?/g,
            code = 'with(YaviData){ var r=[];',
            cursor = 0,
            match;
        var add = function (line, js) {
            js ? code += line.match(reExp) ? line : "r.push(" + line + ");" : code += line != "" ? "r.push('" + line.replace(/'/g, '&#39') + "');" : "";
            return add;
        };
        text = text.replace(/[\n\r\t]/g, '');
        while (match = re.exec(text)) {
            add(text.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        };
        add(text.substr(cursor, text.length - cursor));
        return code + "return r.join('');}";
    }

    __hooks = {};

    constructor(data) {
        if (typeof data === "object") {

            let self = this;

            loop(data, function (value, key) {

                if (typeof value === "object" && value.__ishook) {
                    self.__hooks[key] = value;
                    return;
                }

                self[key] = value;
            });
        }
    }

    hook(name) {
        return this.__hooks[name] ? ('<span class="hook-' + name + '"></span>') : '';
    }

    /**
     * 
     * @param {Array} options 
     * @param {Function} callback 
     * @returns 
     */
    static map(object, callback) {

        let arr = [], data;

        for (let key in object) {
            if (data = callback(object[key], key)) arr.push(data);
        }

        return r.join($notext);
    }
    map(object, callback) {
        return ViewData.map(object, callback);
    }
}