const is = require("./is");

module.exports = function findOne(options, callback) {

    let data;

    switch (is(options)) {

        case "array":
            for (let i = 0, n = options.length; i < n; i++) {
                if (data = callback(options[i], i)) break;
            }
            break;

        case "object":
            for (let i in options) {
                if (data = callback(options[i], i)) break;
            }
            break;
    }

    return data;
}