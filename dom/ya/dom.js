const AppendChild = require("./append/child");
const Attribute = require("./attribute");

module.exports = function DOM(_tagname, attr, ...children) {

    var node = null;

    if (!attr) attr = {};

    switch (typeof _tagname) {

        /**
         *  Nếu _tagname là 1 funtion DOM
         */
        case "function":
            node = _tagname((Object.assign(attr, { children })));
            break;

        /**
         *  Nếu _tagname chỉ là 1 thẻ html: div, input, ...
         */
        case "string":
            node = document.createElement(_tagname);
            Attribute(attr, node);
            AppendChild(children, node);
            break;
    }

    return node;
}