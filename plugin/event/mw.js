const $notext = "";

const breakRouter = {
    "_0_favicon": 1,
    "_1_public": 1,
    "_2_public": 1,
    "_3_public": 1,
    "_socket_": 1
};

module.exports = function (Plugin, addEvent, plugin_events) {

    function addMW(plugin, router, method, controller) {
        addEvent("middleware", router + method, "append", {
            ID: plugin.ID,
            dir: plugin.dir,
            controller
        });
    };

    Object.defineProperty(Plugin.prototype, "use", {
        writable: false,
        value(router_name, controller) {
            addMW(this, router_name, $notext, controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "get", {
        writable: false,
        value(router_name, controller) {
            addMW(router_name, router_name, "get", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "put", {
        writable: false,
        value(router_name, controller) {
            addMW(router_name, router_name, "put", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "post", {
        writable: false,
        value(router_name, controller) {
            addMW(router_name, router_name, "post", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "delete", {
        writable: false,
        value(router_name, controller) {
            addMW(router_name, router_name, "delete", controller);
        }
    });

    Object.defineProperty(Plugin, "run_mw", {
        writable: false,
        value(router_name, method, request, response) {
            return new Promise(function (success, error) {

                if (breakRouter[router_name]) return success();

                let $event, $list, $nextid = 0, $stop;

                if ($event = plugin_events.middleware) {

                    if ($list = $event.get_event(router_name + method)) {

                        if ($stop = $list.length) {

                            function next(err) {
                                if (err) return error(err);
                                $stop > $nextid ? $list[$nextid++].controller(request, response, next) : success();
                            }
                            next();
                            return;
                        }
                    }
                }

                success();
            });
        }
    });

}