const TextEvent = require("./text");

module.exports = class ArraySate extends TextEvent {

    constructor(value) {
        super(value);
        this.isStateArray = 1;
        delete this.isStateText;
    }

    #ArrayAction(render_action, callback) {

        let arrayElement = new ArraySate(this.value);

        arrayElement.render_action = render_action;
        arrayElement.callback = callback;

        this.on((array_data) => arrayElement.emit(array_data));

        return arrayElement;
    }
    map(callback) {
        return this.#ArrayAction("replaceChild", callback);
    }
    append(callback) {
        this.value = this.value.reverse();
        return this.#ArrayAction("appendChild", callback);
    }
    prepend(callback) {
        return this.#ArrayAction("prependChild", callback, this.value.reverse());
    }
}