
module.exports = function (Plugin, addEvent, runEvent) {

    Object.defineProperty(Plugin.prototype, "hook", {
        writable: false,
        value(hook_name, hook_action) {

            hook_action.ID = this.ID;

            switch (typeof hook_name) {
                case "string":
                    addEvent("hook", hook_name, "append", hook_action);
                    break;

                case "object":
                    hook_name.forEach(function (name) {
                        addEvent("hook", name, "append", hook_action);
                    });
                    break;
            }
        }
    });

    Object.defineProperty(Plugin, "get_hook", {
        writable: false,
        value(hook_name, request) {
            return runEvent("hook", hook_name, request).then(x => !x ? "" : x.join(""));
        }
    });
}