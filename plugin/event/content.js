
module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "content", {
        writable: false,
        value(data_name, data_action) {
            data_action.ID = this.ID;
            addEvent("content", data_name, "prepend", data_action);
        }
    });

    Object.defineProperty(Plugin, "get_content", {
        writable: false,
        value(data_name, request) {

            let $event, data;

            if ($event = plugin_events.content) {
                if (data = $event.get_first(data_name)) {
                    return data(request);
                }
            }
        }
    });
}