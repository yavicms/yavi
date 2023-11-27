const { menu, loop, is } = require("yavi/lib");

module.exports = function (Plugin, addEvent, plugin_events) {

    /**
     *  app.menu("admin:sidebar", { parent, title, name, icon });
     */
    function get_menu(menu_key) {
        let $event, $menu;

        if ($event = plugin_events.menu) {
            if ($menu = $event[menu_key]) {
                return menu($menu);
            }
        }

        return [];
    }

    Object.defineProperty(Plugin.prototype, "menu", {
        writable: false,
        value(menu_key, menu_value) {

            let { ID, dir } = this,
                list = is.array(menu_value) ? menu_value : [menu_value];

            loop(list, function (row) {
                row.ID = ID;
                row.dir = dir;
                addEvent("menu", menu_key, "append", row);
            });
        }
    });

    Object.defineProperty(Plugin, "get_menu", {
        writable: false,
        value: get_menu
    });

    Object.defineProperty(Plugin.prototype, "get_menu", {
        writable: false,
        value: get_menu
    });

};