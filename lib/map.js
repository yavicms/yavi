module.exports = function map(options, callback) {
    if (typeof options.length == "number") {
        let $arr = [];
        for (let i = 0, n = options.length; i < n; i++) {
            $arr.push(options[i]);
        }
        return $arr;
    } else {
        let $obj = {};
        for (let key in options) {
            let val = callback(options[key], key);
            if (val !== undefined) $obj[key] = val;
        }
        return $obj;
    }
}