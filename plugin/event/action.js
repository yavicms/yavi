
module.exports = function (Plugin, addEvent, runEvent) {

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
            return runEvent("action", action_name, request, data);
        }
    });

}