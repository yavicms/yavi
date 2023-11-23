const Plugin = require("yavi/plugin/lib");

/**
 *  Static
 */
const staticSetDir = require("yavi/plugin/static/set-dir");
const staticGetID = require("yavi/plugin/static/set-get-id");
const staticListPlugin = require("yavi/plugin/static/list-plugin");
const staticActive = require("yavi/plugin/static/active");
const staticEvent = require("yavi/plugin/static/event");
const staticAction = require("yavi/plugin/static/action");

// set: dir, info
staticSetDir(Plugin);

// make plugin.ID from "type" + "name" : Plugin.getID(type, name);
staticGetID(Plugin);

// set/get : plugin / "list plugin"
staticListPlugin(Plugin);

// event emitter
staticEvent(Plugin);

// active/deactive
staticActive(Plugin);

//
staticAction(Plugin);

//------------------- Plugin Events ---------------------

module.exports = Plugin;