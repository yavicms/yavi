const is = require("./is");

module.exports = function loop(options, callback) {

    switch (is(options)) {

        case "array":
            for (var i = 0, n = options.length; i < n; i++) {
                if (callback(options[i], i)) break;
            }
            break;

        case "object":
            for (var i in options) {
                if (callback(options[i], i)) break;
            }
            break;
    }
}