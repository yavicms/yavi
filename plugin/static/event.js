const Event = require("yavi/lib/event");
const pluginEvent = new Event();

module.exports = function (Plugin) {

    const staticPlugin = [
        ["on", function (name, callback) {
            pluginEvent.on(name, callback);
        }],
        ["emit", function (...params) {
            return pluginEvent.emit(...params);
        }],
        ["error", function ($for, $location, $error, $more) {
            let info = {
                $listen:
                {
                    $event: "App.on('error')",
                    $location: __filename
                },
                $target:
                {
                    $for,
                    $location,
                    $error:
                    {
                        $name: $error.name,
                        $message: $error.message
                    },
                    $more
                },
                $time: (new Date()).toString()
            };

            if (Plugin.info.dev) {
                console.log(info);
            } else {
                // Plugin.json(`${App.dir}/error.json`, info);
            }
        }],
        ["log", function ($for, $location, $log) {
            let info = {
                $listen:
                {
                    $event: "App.on('log')",
                    $location: __filename
                },
                $target: { $for, $location, $log },
                $time: (new Date()).toString()
            };

            if (Plugin.info.dev) {
                console.log(JSON.stringify(info, null, "\t"));
            }
        }]
    ];

    staticPlugin.forEach(function (row) {
        Object.defineProperty(Plugin, row[0], { writable: false, value: row[1] });
    });

};