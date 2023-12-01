const $notext = "";

module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "data", {
        writable: false,
        value(data_name, data_action) {
            data_action.ID = this.ID;
            addEvent("data", data_name, "prepend", data_action);
        }
    });

    Object.defineProperty(Plugin, "get_data", {
        writable: false,
        value: async function (data_name, request) {

            let $event = plugin_events.data, action;

            if ($event = plugin_events.data) {
                if (action = $event[data_name][0]) {
                    return action(request);
                }
            }
        }
    });

    Object.defineProperty(Plugin.prototype, "get_data", {
        writable: false,
        value: Plugin.get_data
    });
}