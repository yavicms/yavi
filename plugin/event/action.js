
module.exports = function (Plugin, addEvent, emitEvent) {

    Object.defineProperty(Plugin.prototype, "on", {
        writable: false,
        value(action_name, action_callback) {
            action_callback.ID = this.ID;
            addEvent("action", action_name, "append", action_callback);
        }
    });

    Object.defineProperty(Plugin.prototype, "emit", {
        writable: false,
        value(action_name, request, data) {
            return emitEvent("action", action_name, request, data);
        }
    });

}