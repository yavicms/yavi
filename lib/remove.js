const is = require('yavi/lib/is');

module.exports = function remove(options, callback) {

    switch (is(options)) {

        case "array":
            for (var i = 0, n = options.length; i < n; i++) {
                if (callback(options[i], i)) {
                    options.splice(i, 1);
                    break;
                }
            }
            break;

        case "object":
            for (var i in options) {
                if (callback(options[i], i)) {
                    delete options[i];
                    break;
                }
            }
            break;
    }
}