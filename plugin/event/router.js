
module.exports = function (Plugin, addEvent, plugin_events) {

    Object.defineProperty(Plugin.prototype, "router", {
        writable: false,
        value(router_name, router_path, controller) {

            addEvent("routes", router_name, "prepend", {
                name: router_name,
                path: new RegExp("^" + router_path + "$"),
                ID: this.ID,
                dir: this.dir,
                controller
            });
        }
    });

    Object.defineProperty(Plugin.prototype, "error", {
        writable: false,
        value(controller) {

            let router_name = "error";

            addEvent(router_name, router_name, "prepend", {
                params: [],
                name: router_name,
                ID: this.ID,
                dir: this.dir,
                controller
            });
        }
    });

    Object.defineProperty(Plugin, "checkRouter", {
        writable: false,
        value(request, pathname) {

            return new Promise(function (success, error) {

                let $event, router, params, $router;

                if ($event = plugin_events.routes) {

                    for (let router_name in $event) {

                        if ($router = $event[router_name][0]) {

                            if (params = $router.path.exec(pathname)) {

                                params.splice(0, 1);
                                router = $router;

                                break;
                            }
                        }
                    }

                    if (!router) router = plugin_events.error.error[0];

                    request.router = {
                        name: router.name,
                        ID: router.ID,
                        dir: router.dir
                    };
                    request.params = params || [];
                    request.yavi_controller = router.controller;

                    success();
                    return;
                }

                error();
            });
        }
    });

}