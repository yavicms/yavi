const { loop } = require("yavi/lib");

module.exports = class StateText {

    #$events = [];

    constructor(value) {
        this.isStateText = 1;
        this.value = value;
    }

    on(callback) {
        this.#$events.push(callback);
    }

    emit(value) {
        loop(this.#$events, (event) => event(value));
    }
}