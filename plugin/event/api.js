const error_page = {
    name: "page_not_found",
    message: "page_not_found"
};

module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "api", {
        writable: false,
        value(method, name, action) {
            action.ID = this.ID;
            addEvent("api" + method, name, "prepend", action);
        }
    });

    Object.defineProperty(Plugin, "get_api", {
        writable: false,
        value: async function (method, name, req) {

            let $event, $list, action, $key = "api" + method;

            if ($event = plugin_events[$key]) {
                if ($list = $event[name]) {
                    if (action = $list[0]) {
                        return await action(req);
                    }
                }
            }

            throw new Error(error_page);
        }
    });

}