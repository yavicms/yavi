const Plugin = require('./lib/class');

/**
 *  Static
 */
const staticSetDir = require("./static/set-dir");
const staticGetID = require("./static/set-get-id");
const staticListPlugin = require("./static/list-plugin");
const staticActive = require("./static/active");
const staticEvent = require("./static/event");
const staticAction = require("./static/action");

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

module.exports = Plugin;