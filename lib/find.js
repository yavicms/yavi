const is = require("./is");

module.exports = function find(options, callback) {

    let r, data;

    switch (is(options)) {

        case "array":
            data = [];
            for (let i = 0, n = options.length; i < n; i++) {
                if (r = callback(options[i], i)) data.push(r);
            }
            break;

        case "object":
            data = {};
            for (let i in options) {
                if (r = callback(options[i], i)) data[i] = r;
            }
            break;
    }

    return data;
}