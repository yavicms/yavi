
module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "filter", {
        writable: false,
        value(plugin) {
            return function (filter_name, filter_action) {
                filter_action.ID = plugin.ID;
                addEvent("filter", filter_name, "append", filter_action);
            };
        }
    });

    Object.defineProperty(Plugin, "get_filter", {
        writable: false,
        value(data_name, request) {

            let $event, $data, $filter;

            if ($event = plugin_events.filter) {
                if ($data = Plugin.get_data(data_name, request)) {

                    $filter = typeof $data.then === "function"
                        ? $data.then(_data => $event.emit(data_name, request, _data))
                        : $event.emit(data_name, request, $data);

                    return $filter.then(arr => arr[(arr.length - 1)] || $data);
                }
            }

            return Promise.resolve();
        }
    });

}