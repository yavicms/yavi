module.exports = function remove(options, callback) {

    if (typeof options !== "object") return;

    if (options.length === "number") {
        for (let i = 0, n = options.length; i < n; i++) {
            if (callback(options[i], i)) {
                options.splice(i, 1);
                break;
            }
        }
    } else {
        for (let i in options) {
            if (callback(options[i], i)) {
                delete options[i];
                break;
            }
        }
    }
}