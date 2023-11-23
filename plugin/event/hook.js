
module.exports = function (Plugin, addEvent, emitEvent) {

    Object.defineProperty(Plugin.prototype, "hook", {
        writable: false,
        value(hook_name, hook_action) {
            hook_action.ID = this.ID;
            addEvent("hook", hook_name, "append", hook_action);
        }
    });

    Object.defineProperty(Plugin, "get_hook", {
        writable: false,
        value(hook_name, request) {
            return emitEvent("hook", hook_name, request);
        }
    });
}