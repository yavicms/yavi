const ListProto = [
    ["menu", require('./menu')],
    ["find", require("./find")],
    ["findOne", require("./findOne")],
    ["loop", require("./loop")],
    ["remove", require("./remove")],
    ["map", require("./map")],
    ["is", require("yavi/lib/is")],
    ["qs", require("yavi/lib/query-string")],
    ["Event", require("yavi/lib/event")],
    ["copy", function (options) {
        return typeof options === "object" ? JSON.parse(JSON.stringify(options)) : options;
    }],
    ["assign", function (to, from) {
        return Object.assign(to, from);
    }],
    ["user_validate", require("./user-validate")],
    ["$notext", ""]
];

class YaLib { };

ListProto.forEach((row) =>
    Object.defineProperty(YaLib, row[0], { writable: false, value: row[1] }));

module.exports = YaLib;