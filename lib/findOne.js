module.exports = function findOne(options, callback) {

    let data;

    if (typeof options.length === "number") {
        for (let i = 0, n = options.length; i < n; i++) {
            if (data = callback(options[i], i)) break;
        }
    } else {
        for (let i in options) {
            if (data = callback(options[i], i)) break;
        }
    }

    return data;
}