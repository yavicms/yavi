module.exports = class Event {

    #$events = {};

    on(event_name, callback) {
        if (!this.#$events[event_name]) this.#$events[event_name] = [];

        this.#$events[event_name].push(callback);
    }

    emit(event_name, ...array) {
        let events = this.#$events[event_name] || [];
        return Promise.all(events.map(fn => fn(...array)));
    }

    loop(callback) {
        for (var name in this.#$events) {
            if (callback(this.#$events[name], name)) break;
        }
    }

    get(name) {
        return this.#$events[name] || [];
    }

    remove(event_name) {
        delete this.#$events[event_name];
    }

    reset() {
        this.#$events = {};
    }
}