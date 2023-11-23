const { loop, is } = require("yavi/lib");

module.exports = function useEffect(action, array) {

    let isAction = is(action),
        isArray = is(array);

    if (isAction === "function") {
        if (isArray === "array" && array.length) {
            loop(array, element =>
                is(element, "object") && element.isEvent
                    ? element.on(action)
                    : undefined);
        } else {
            return action();
        }
    }
}