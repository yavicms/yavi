const { loop } = require("yavi/lib");

const protoAction = require("yavi/plugin/event/action");
const protoContent = require("yavi/plugin/event/content");
const protoData = require("yavi/plugin/event/data");
const protoFilter = require("yavi/plugin/event/filter");
const protoHook = require("yavi/plugin/event/hook");
const protoMenu = require("yavi/plugin/event/menu");
const protoMW = require("yavi/plugin/event/mw");
const protoRouter = require("yavi/plugin/event/router");
const protoApi = require("yavi/plugin/event/api");

/**
    plugin_events:
    {
        "middleware":
        {
            "name1": [],
            "name2": []
        },
        "routes":
        {
            "name1": [],
            "name2": []
        }
    }
*/

module.exports = function (Plugin) {

    let plugin_events = {};
    let plugin_count = {};
    let _action = {
        "append": "push",
        "prepend": "unshift"
    };

    async function runEvent(event, name, ...params) {

        let $event, $data;

        if ($event = plugin_events[event]) {
            if ($data = $event[name]) {
                return Promise.all($data.map(fn => fn(...params)));
            }
        }
    }

    function addEvent(event, name, action, value) {

        /**
         * Events
         */
        let ac = _action[action] || _action.append;

        if (!plugin_events[event]) plugin_events[event] = {};
        if (!plugin_events[event][name]) plugin_events[event][name] = [];

        plugin_events[event][name][ac](value);

        /**
         * Count
         */
        if (!plugin_count[value.ID]) plugin_count[value.ID] = {};
        if (!plugin_count[value.ID][event]) plugin_count[value.ID][event] = {};

        if (!plugin_count[value.ID][event][name]) {
            plugin_count[value.ID][event][name] = 1;
        }
        else {
            ++plugin_count[value.ID][event][name];
        }
    }

    /**
     * -------------------------------------------------------------------------
     */
    Plugin.on("plugin.remove", function (ID) {

        if (ID == 0) return;

        try {

            loop(plugin_count[ID], function (list, event) {
                loop(list, function (count, name) {
                    let $list = plugin_events[event][name], deleted = 0, i = 0;
                    while (deleted < count) {
                        if (ID == $list[i].ID) {
                            plugin_events[event][name].splice(i, 1);
                            deleted++;
                        }
                        else {
                            i++;
                        }
                    }
                });
            });

            delete plugin_count[ID];

        } catch (error) {
            console.log(error);
        }
    });

    Plugin.on("plugin.reload", function () {
        plugin_events = {};
        Plugin.Load();
    });

    /**
     * --------------------------------------------------------------------------
     */

    /**
     * Action
     */
    protoAction(Plugin, addEvent, runEvent);

    /**
     * Content
     */
    protoContent(Plugin, addEvent, plugin_events);

    /**
     * Hook
     */
    protoHook(Plugin, addEvent, runEvent);

    /**
     * Menu
     */
    protoMenu(Plugin, addEvent, plugin_events);

    /**
     *  Middleware
     */
    protoMW(Plugin, addEvent, plugin_events);

    /**
     * Data
     */
    protoData(Plugin, addEvent, plugin_events);

    /**
     * Filter
     */
    protoFilter(Plugin, addEvent, plugin_events);

    /**
     * Router
     */
    protoRouter(Plugin, addEvent, plugin_events);

    /**
     * Api
     */
    protoApi(Plugin, addEvent, plugin_events);
}