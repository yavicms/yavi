const is = require("./is");

module.exports = function map(options, callback) {

    let $r;

    switch (is(options)) {

        case "array":
            $r = [];
            for (let i = 0, n = options.length; i < n; i++) {
                $r.push(callback(options[i]));
            }
            break;

        case "object":
            $r = {};
            for (let key in options) {
                let $v = callback(options[key], key);
                if ($v !== undefined) $r[key] = $v;
            }
            break;
    }

    return $r;
}