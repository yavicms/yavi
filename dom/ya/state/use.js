const StateText = require("./text");
const StateArray = require("./array");
const { is, loop } = require("yavi/lib");

module.exports = function useState(value) {

    let $type = is(value);
    let $events, action;

    switch ($type) {

        case "string":
        case "number":
            $events = new StateText(value);
            action = function (options) {
                if ($type !== is(options)) return;
                $events.emit(options);
            }
            break;

        case "object":
            $events = {};

            loop(value, ($value, $name) =>
                $events[$name] = new StateText($value));

            action = function (options) {
                if ($type !== is(options)) return;
                loop(options, ($value, $name) =>
                    $events[$name].emit($value));
            }
            break;

        case "array":
            $events = new StateArray(value, $type);

            action = function (options) {
                switch (is(options)) {

                    case "string":
                    case "number":
                    case "object":
                        $events.emit([options]);
                        break;

                    case "array":
                        $events.emit(options);
                        break;
                }
            }
            break;

        default:
            return;
    }

    return [$events, action];
};