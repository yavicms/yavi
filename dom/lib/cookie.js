const Cookie = require("cookie");
const cookie = {}, cookie_data = Cookie.parse(document.cookie);
const delete_template = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

Object.defineProperties(cookie, {

    set: {
        writable: false,
        value(name, value, days) {
            let d = new Date(), expires;

            if (typeof days !== "number") days = 7;

            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

            expires = "expires=" + d.toUTCString();

            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }
    },

    get: {
        writable: false,
        value(name) {
            return cookie_data[name];
        }
    },

    has: {
        writable: false,
        value(name) {
            let value = cookie_data[name] || "";
            return value.length > 0;
        }
    },

    remove: {
        writable: false,
        value(name) {
            switch (typeof name) {
                case "string":
                    document.cookie = name + delete_template;
                    break;

                case "object":
                    if (name.length) {
                        name.forEach(function ($name) {
                            document.cookie = $name + delete_template;
                        });
                    }
                    break;
            }
        }
    }
});

module.exports = cookie;