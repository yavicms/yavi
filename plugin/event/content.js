
/**

// use for view
app.content("admin:sidebar", function(req){
    return "text view";
});

// use for ajax [get/post/put/delete]
app.content("get.router.path", function(req){
    return Object;
});

// on view html
{{ content("get.router.path") }}

*/

module.exports = function (Plugin, addEvent, plugin_events) {

    const event_name = "content";

    Object.defineProperty(Plugin.prototype, event_name, {
        writable: false,
        value(data_name, data_action) {

            let list = data_name.split(".");

            if (list.length === 3) {
                let [method, router, path] = list;
                addEvent(event_name + method, router + path, "prepend", data_action);
            }
        }
    });

    /**
     * Get Content
     * app.get_content_page(req);
     */
    Object.defineProperty(Plugin.prototype, "get_content_page", {
        writable: false,
        value: async function (req) {

            let $event, $list, data;

            if ($event = plugin_events[(event_name + req.method)]) {
                if ($list = $event[(req.router.name + req.params[0])]) {
                    if (data = $list[0]) {
                        return await data(req);
                    }
                }
            }

            throw new Error();
        }
    });

    /**
     * app.get_content("get.account.login", req);
     */
    Object.defineProperty(Plugin.prototype, "get_content", {
        writable: false,
        value: async function (data_name, req) {

            let $event, $list, data,
                [method, router, path] = data_name.split(".");

            if ($event = plugin_events[(event_name + method)]) {
                if ($list = $event[(router + path)]) {
                    if (data = $list[0]) {
                        return await data(req);
                    }
                }
            }

            throw new Error();
        }
    });

}