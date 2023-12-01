const { is } = require('yavi/lib');

module.exports = function (Props) {

    Object.defineProperty(Props, "getType", {
        writable: false,
        value: async function (type) {
            return is.string(type) && type.length ? Props.find({ type }) : null;
        }
    })
}