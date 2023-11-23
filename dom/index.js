const Socket = require("yavi/dom/lib/ws");
const ListSocket = {};

Object.defineProperties(window, {
    Yavi: {
        writable: false,
        value: require("yavi/lib")
    },
    ajax: {
        writable: false,
        value: require("yavi/dom/lib/ajax")
    },
    WS: {
        writable: false,
        value(uri, protocols) {
            if (!uri) uri = document.location.origin;

            uri = uri.replace(/^http/, 'ws');

            if (!ListSocket[uri]) ListSocket[uri] = new Socket(uri, protocols);
            return ListSocket[uri];
        }
    },
    spa: {
        writable: false,
        value(http, url, callback) {
            return http.html(url).then(function (html) {
                return Promise.all([
                    document.title = html.title,
                    history.pushState(null, "", url),
                    callback && callback(html)
                ]);
            });
        }
    }
});