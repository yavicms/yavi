module.exports = function find(options, callback) {
    if (typeof options.length === "number") {
        let arr = [], data;
        for (let i = 0, n = options.length; i < n; i++) {
            if (data = callback(options[i], i)) arr.push(data);
        }
        return arr;
    } else {
        let obj = {}, data;
        for (let i in options) {
            if (data = callback(options[i], i)) obj[i] = data;
        }
        return obj;
    }
}