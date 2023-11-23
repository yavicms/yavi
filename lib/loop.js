module.exports = function loop(options, callback) {
    if (typeof options.length === "number") {
        for (let i = 0, n = options.length; i < n; i++) {
            if (callback(options[i], i)) break;
        }
    } else {
        for (let i in options) {
            if (callback(options[i], i)) break;
        }
    }
}