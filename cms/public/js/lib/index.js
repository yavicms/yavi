const Socket = require("./ws");
const is = require("yavi/lib/is");
const ListSocket = {};
const $autoload_all = [];
const $autoload_page = {};

function Link(url) {

    let a = document.createElement("a");

    a.href = url;

    return a;
}

Object.defineProperties(window, {
    yavi: {
        writable: false,
        value: require("yavi/lib")
    },
    WS: {
        writable: false,
        value(uri, protocols) {

            if (!uri) uri = document.location.origin;

            uri = Link(uri).href;

            if (!ListSocket[uri])
                ListSocket[uri] = new Socket(uri.replace(/^http/, 'ws'), protocols);

            return ListSocket[uri];
        }
    },
    spa: {
        writable: false,
        value(http, url, callback) {
            return http.html(url).then(function (html) {
                return Promise.all([
                    document.title = html.title,
                    history.pushState(null, null, url),
                    load_page(url),
                    callback && callback(html),
                    yavi.emit("spa", html)
                ]);
            });
        }
    },
    load_page: {
        writable: false,
        value(uri, cb) {
            Promise.all($autoload_all.map(fn => fn()));

            var link = Link(uri),
                list = $autoload_page[link.pathname];

            list && Promise.all(list.map(fn => fn()));

            cb && cb(link.href);
        }
    },
    cookie: {
        writable: false,
        value: require('./cookie')
    },
    page: {
        writable: false,
        value() {

            switch (is(arguments[0])) {

                case "string":
                    var path = Link(arguments[0]).pathname,
                        fn = arguments[1];
                    if (typeof fn === "function") {
                        if (!$autoload_page[path]) $autoload_page[path] = [];
                        $autoload_page[path].push(fn);
                    }
                    break;

                case "function":
                    $autoload_all.push(arguments[0]);
                    break;

                case "array":
                    var routes = arguments[0], fn = arguments[1], path;

                    if (typeof fn !== "function") return;

                    for (var i = 0, n = routes.length; i < n; i++) {
                        path = Link(routes[i]).pathname;
                        if (!$autoload_page[path]) $autoload_page[path] = [];
                        $autoload_page[path].push(fn);
                    }
                    break;
            }
        }
    }
});

const yavi_events = new yavi.Event();

window.onpopstate = function (e) {
    yavi_events.emit("popstate", e);
};

Object.defineProperties(window.yavi, {
    on: {
        writable: false,
        value(name, callback) {
            yavi_events.on(name, callback);
        }
    },
    emit: {
        writable: false,
        value(name, ...value) {
            yavi_events.emit(name, ...value);
        }
    }
});