
module.exports = function (Plugin, addEvent, plugin_events) {

    const event_name = "content";

    Object.defineProperty(Plugin.prototype, event_name, {
        writable: false,
        value(data_name, data_action) {
            data_action.ID = this.ID;
            addEvent(event_name, data_name, "prepend", data_action);
        }
    });

    Object.defineProperty(Plugin, "get_content", {
        writable: false,
        value: async function (data_name, request) {

            let $event, $list, data;

            if ($event = plugin_events[event_name]) {
                if ($list = $event[data_name]) {
                    if (data = $list[0]) {
                        return data(request);
                    }
                }
            }
        }
    });
}