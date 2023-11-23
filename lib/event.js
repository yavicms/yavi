module.exports = class Event {

    #$events = {};

    on(event_name, callback) {
        if (!this.#$events[event_name]) this.#$events[event_name] = [];

        this.#$events[event_name].push(callback);
    }

    emit(event_name, ...array) {
        let events = this.#$events[event_name] || [];
        return Promise.all(events.map(event => event.apply(null, array)));
    }

    remove(event_name) {
        delete this.#$events[event_name];
    }

    plugin_remove(pluginID, list_events) {

        let events = this.#$events;

        for (let event_name in events) {

            let list = events[event_name], n = list.length;

            for (let i = 0; i < n; i++) {

                if (pluginID === list[i].ID) {
                    this.#$events[event_name].splice(i, 1);
                }

            }

        }
    }

    reset() {
        this.#$events = {};
    }
}