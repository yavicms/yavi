const ListType = [
    "string",
    "number",
    "undefined",
    "boolean",
    "object",
    "array",
    "function"
];

const ListMethods = [
    ["email", function (value) {
        return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }],
    ["phone", function (value) {
        return typeof value === "string" && /^\d{9,15}$/.test(value);
    }],
    ["password", function (value) {
        return typeof value === "string" && /^[^\t\n]{8,200}$/.test(value);
    }]
];

/**
 * 
 * @param {*} value : true, fasle, text, 123, ...
 * @param {String} type : string, number, object, ...
 * @returns : {String} value-type or {Boolean} true|false
 * 
 * Use : is("text") => string
 *       is("text", "string") => true
 *       is("text", "number") => false
 * 
 *       is.string("text") => true
 *       is.string(123) => false
 */
function is(value, type) {

    let $type = typeof value,
        isarray = $type === "object" && value.length !== undefined;

    return isarray
        ? (!type ? "array" : type === "array")
        : (!type ? $type : type === $type);
};

ListType.forEach((type) =>
    Object.defineProperty(is, type, {
        writable: false,
        value(value) { return is(value, type); }
    }));

ListMethods.forEach((row) =>
    Object.defineProperty(is, row[0], {
        writable: false,
        value: row[1]
    }));

module.exports = is;