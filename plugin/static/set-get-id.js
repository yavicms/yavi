module.exports = function (Plugin) {

    Object.defineProperty(Plugin, "ID", {
        writable: false,
        value: { cms: 0, admin: 1, theme: 2 }
    });

    Object.defineProperty(Plugin, "getID", {
        writable: false,
        value(type, name) {

            switch (type) {

                case "cms":
                    return 0;

                case "admin":
                    return 1;

                case "theme":
                    return 2;

                case "plugin":
                    return type + name;
            }
        }
    });

}
