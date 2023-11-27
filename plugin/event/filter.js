
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
        value: async function (data_name, request) {

            let $event, $data, $filter;

            if ($event = plugin_events.filter) {
                if ($filter = $event[data_name]) {
                    if ($data = Plugin.get_data(data_name, request)) {
                        return $data
                            .then(_data => Promise.all($filter.map(fn => fn(request, _data))))
                            .then(arr => arr[(arr.length - 1)] || $data);
                    }
                }
            }
        }
    });

}