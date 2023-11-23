const SetAttribute = require("./set");
const { loop } = require("yavi/lib");

module.exports = function Attribute(attributes, node) {
    loop(attributes, (value, key) => SetAttribute(value, key, node));
    return node;
}