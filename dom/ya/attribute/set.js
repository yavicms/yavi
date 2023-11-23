const EventText = require("../state/text");
const { is, loop } = require("yavi/lib");

module.exports = function SetAttribute(value, key, node) {

    switch (is(value)) {

        case "array":
            let valueCopy = [...value];
            let eventAttribute = new EventText(valueCopy);

            eventAttribute.on((data) => node[key] = data.join(""));

            loop(value, function ($value, $index) {

                if (is($value, "object")) {

                    if ($value.isStateText) {

                        valueCopy[$index] = $value.value;

                        $value.on(function ($data) {
                            valueCopy[$index] = $data;
                            eventAttribute.emit(valueCopy);
                        });

                    } else {
                        valueCopy[$index] = "";
                    }
                }
            });

            eventAttribute.emit(valueCopy);
            break;

        case "object":
            if (value.isStateText) {
                node[key] = value.value;
                value.on(attrVal => node[key] = attrVal);
            }
            else if (value.isStateArray) {
                break;
            }
            else {
                loop(value, (v, k) => node[key][k] = v);
            }
            break;

        default:
            node[key] = value;
            break;
    }

    return node;
}