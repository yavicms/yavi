
module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "api", {
        writable: false,
        value(method, name, action) {
            action.ID = this.ID;
            addEvent("api", name + method, "prepend", action);
        }
    });

    Object.defineProperty(Plugin, "get_api", {
        writable: false,
        value: async function (method, name, req) {

            let $event, $list, action, $path = name + method;

            if ($event = plugin_events.api) {
                if ($list = $event[$path]) {
                    if (action = $list[0]) {
                        return action(req);
                    }
                }
            }

            throw new Error("page_not_found");
        }
    });

}