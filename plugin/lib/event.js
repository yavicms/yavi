const { findOne, loop } = require("yavi/lib");

module.exports = class PluginEvent {

    static ListAction = {
        push: "push",
        append: "push",
        unshift: "unshift",
        prepend: "unshift"
    };

    #$events = {};
    #$action = "push";

    constructor(action) {
        if (action = PluginEvent.ListAction[action]) this.#$action = action;
    }

    on(event_name, event_action) {
        if (!this.#$events[event_name]) this.#$events[event_name] = [];
        this.#$events[event_name][this.#$action](event_action);
    }
    emit(event_name, ...params) {
        let events = this.#$events[event_name] || [];
        return Promise.all(events.map((event => event.apply(null, params))));
    }

    emit_first(event_name, ...params) {
        let events = this.#$events[event_name];
        if (events && events[0]) return events[0].apply(null, params);
    }
    emit_last(event_name, ...params) {
        let events = this.#$events[event_name] || [],
            event = events[(events.length - 1)];
        if (event) return event.apply(null, params);
    }

    get_first(event_name) {
        let events = this.#$events[event_name];
        if (events) return events[0];
    }

    get_last(event_name) {
        let events = this.#$events[event_name];
        if (events) return events[(events.length - 1)];
    }

    get_all() {
        return this.#$events;
    }
    get_event(event_name) {
        return this.#$events[event_name] || [];
    }

    findOne(callback) {
        return findOne(this.#$events, callback);
    }

    findAll(callback) {
        return findAll(this.#$events, callback);
    }

    /**
     * 
     * @param {pluginID} pluginID : plugin-demo
     * @param {Object} list_events : { error: 1, home: 1, _favicon_: 1, _main_: 1 }
     */
    remove(pluginID, list_events) {
        let self = this, events = this.#$events, list;

        loop(list_events, function (count, event_name) {

            let $count = 0;

            if (list = events[event_name]) {

                loop(list, function (event, index) {

                    if (count === $count) return true;

                    if (pluginID === event.ID) {
                        ++$count;
                        self.#$events[event_name].splice(index, 1);
                    }
                });
            }
        });
    }

    reset() {
        this.#$events = {};
    }

}