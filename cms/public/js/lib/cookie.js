const loop = require('yavi/lib/loop');
const CookieBase = require("cookie");
const cookie_data = CookieBase.parse(document.cookie);
const Cookie = {};

function setCookie(key, value, days) {
    let d = new Date(), expires;

    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

    expires = "expires=" + d.toUTCString();

    document.cookie = key + "=" + value + ";" + expires + ";path=/";

    if (days > 0) cookie_data[key] = value;
    else delete cookie_data[key];
};

Object.defineProperties(Cookie, {

    $days: {
        writable: true,
        value: 7
    },

    time: {
        writable: false,
        value(days) {
            if (typeof days === "number") this.$days = days;
            return this;
        }
    },

    set: {
        writable: false,
        value(options, value) {

            var days = this.$days;

            if (arguments.length === 2 && typeof options === "string") {
                setCookie(options, value, days);
            }
            else {
                loop(options, function (value, key) {
                    setCookie(key, value, days);
                });
            }

            return this;
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
        value(...names) {
            return !names.some((name) => cookie_data[name] === undefined);
        }
    },

    remove: {
        writable: false,
        value(...array) {
            let d = new Date(), expires;

            d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));

            expires = "expires=" + d.toUTCString();

            array.forEach(function (key) {
                delete cookie_data[key];
                document.cookie = key + "=;" + expires + ";path=/";
            });
            return this;
        }
    }
});

module.exports = Cookie;