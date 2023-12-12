const $notext = "";
const $all = ":ALL";

/**
    app.get(function(req, res, next){});
    app.get("home", function(req, res, next){});

    app.use(function(req, res, next){});
    app.use("home", function(req, res, next){});
*/

module.exports = function (Plugin, addEvent, plugin_events) {

    function addMW(plugin, router, method, controller) {

        let $router,
            $controller,
            $key = "middleware" + method,
            $action = "append",
            ID = plugin.ID,
            dir = plugin.dir;

        switch (typeof controller) {
            case "function":
                $controller = [controller];
                break;
            case "object":
                if (controller.length) $controller = controller;
                break;
        }

        switch (typeof router) {
            case "string":
                $router = [router];
                break;
            case "function":
                $router = [$all];
                !$controller ? $controller = [router] : $controller.unshift(router);
                break;
            case "object":
                if (router.length) {
                    switch (typeof router[0]) {
                        case "string":
                            $router = router;
                            break;
                        case "function":
                            $router = [$all];
                            $controller = router;
                            break;
                    }
                }
                break;
        }

        if ($router && $controller) {

            $router.forEach(function (router) {
                $controller.forEach(function (controller) {
                    addEvent($key, router, $action, { ID, dir, controller });
                });
            });
        }
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

    //---------------------------------------------------------------

    function run_mw(router, method, req, res) {

        return new Promise(function (success, error) {

            let $event, $list, $stop, $nextid = 0, $key = "middleware" + method;

            if ($event = plugin_events[$key]) {

                if ($list = $event[router]) {

                    if ($stop = $list.length) {

                        function next(err) {
                            if (err) return error(err);
                            $stop > $nextid ? $list[$nextid++].controller(req, res, next) : success();
                        }

                        return next();
                    }
                }
            }

            success();
        });
    }

    Object.defineProperty(Plugin, "run_mw", {
        writable: false,
        value(router, method, req, res) {

            /**
             * Chạy middleware theo thứ tự:
             * 
             * 1. mw chung cho toàn routes:
             *      - router: ":ALL"
             *      - method: ""
             * 
             * 2. mw riêng của router
             *      - router: router
             *      - method: ""
             * 
             * 4. mw phương thức method cho riêng router
             *      - router: router
             *      - method: router
             */
            return run_mw($all, $notext, req, res)
                .then(() => run_mw(router, $notext, req, res))
                .then(() => run_mw(router, method, req, res))
                .then(() => req.router.controller(req, res));
        }
    });
}