const $notext = "";

/**
    app.get("home", function(req, res, next){});
*/

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
            addMW(this, router_name, "get", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "put", {
        writable: false,
        value(router_name, controller) {
            addMW(this, router_name, "put", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "post", {
        writable: false,
        value(router_name, controller) {
            addMW(this, router_name, "post", controller);
        }
    });

    Object.defineProperty(Plugin.prototype, "delete", {
        writable: false,
        value(router_name, controller) {
            addMW(this, router_name, "delete", controller);
        }
    });

    Object.defineProperty(Plugin, "run_mw", {
        writable: false,
        value(router_name, method, request, response) {

            return new Promise(function (success, error) {

                let $event, $list, $nextid = 0, $stop;

                if ($event = plugin_events.middleware) {

                    if ($list = $event[(router_name + method)]) {

                        if ($stop = $list.length) {

                            function next(err) {
                                if (err) return error(err);
                                $stop > $nextid ? $list[$nextid++].controller(request, response, next) : success();
                            }

                            return next();
                        }
                    }
                }

                success();
            });
        }
    });

}