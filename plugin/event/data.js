/**

// set data
app.data("post.list", function(req){});

// get data
app.get_data("post.list", req);

// get data on html view
{{ data("post.list") }}

*/

module.exports = function (Plugin, addEvent, plugin_events) {

    const $event_name = "data", regExp = /^([^\.]+)(.*)/;

    Object.defineProperty(Plugin.prototype, "data", {
        writable: false,
        value(data_name, data_action) {

            var exp = regExp.exec(data_name);

            data_action.ID = this.ID;
            addEvent($event_name + exp[1], exp[2], "prepend", data_action);
        }
    });

    Object.defineProperty(Plugin, "get_data", {
        writable: false,
        value: async function (data_name, request) {

            var exp = regExp.exec(data_name);
            var $event = plugin_events.data, action, $list;

            if ($event = plugin_events[($event_name + exp[1])]) {
                if ($list = $event[exp[2]]) {
                    if (action = $list[0]) {
                        return await action(request);
                    }
                }
            }
        }
    });

    Object.defineProperty(Plugin.prototype, "get_data", {
        writable: false,
        value: Plugin.get_data
    });
}