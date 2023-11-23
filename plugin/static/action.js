const { loop } = require("yavi/lib");
const PluginEvent = require("yavi/plugin/lib/event");

const protoAction = require("yavi/plugin/event/action");
const protoContent = require("yavi/plugin/event/content");
const protoData = require("yavi/plugin/event/data");
const protoFilter = require("yavi/plugin/event/filter");
const protoHook = require("yavi/plugin/event/hook");
const protoMenu = require("yavi/plugin/event/menu");
const protoMW = require("yavi/plugin/event/mw");
const protoRouter = require("yavi/plugin/event/router");

/**
    plugin-events:
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
    
    wait_delete:
    {
        "plugin-name":
        {
            "middleware":
            {
                "name1": 1
            }
        }
    }
*/

module.exports = function (Plugin) {

    let plugin_events = {};
    let wait_delete = {};

    function addWait(...keys) {
        let current = wait_delete,
            lastIndex = keys.length - 1,
            lastKey = keys[lastIndex];

        for (let i = 0; i < lastIndex; i++) {
            const key = keys[i];
            current = current[key] = current[key] || {};
        }

        current[lastKey] = (current[lastKey] || 0) + 1;
    };
    function addEvent(event, name, action, value) {
        if (!plugin_events[event]) plugin_events[event] = new PluginEvent(action);
        plugin_events[event].on(name, value);

        addWait(value.ID, event, name);
    };
    function emitEvent(event, name, request, data) {
        let $event = plugin_events[event];
        return $event ? $event.emit(name, request, data) : Promise.resolve([]);
    };

    Object.defineProperty(Plugin, "getEvent", {
        writable: false,
        value(event, name, request, data) {
            return emitEvent(event, name, request, data);
        }
    });

    Plugin.on("plugin.remove", function (ID) {
        if (ID == 0) return;

        loop(wait_delete[ID], function (list, event) {
            let $event = plugin_events[event];
            if ($event) $event.remove(ID, list);
        });
    });
    Plugin.on("plugin.reload", function () {
        plugin_events = {};
        wait_delete = {};
    });

    /**
     * Action
     */
    protoAction(Plugin, addEvent, emitEvent);

    /**
     * Content
     */
    protoContent(Plugin, addEvent, plugin_events);

    /**
     * Hook
     */
    protoHook(Plugin, addEvent, emitEvent);

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

}