const Socket = require("./ws");
const ListSocket = {};
const $autoload_all = [];
const $autoload_page = {};

function getPath(url) {

    let a = document.createElement("a");

    a.href = url;

    return a.href;
}

Object.defineProperties(window, {
    yavi: {
        writable: false,
        value: require("yavi/lib")
    },
    ajax: {
        writable: false,
        value: require("./ajax")
    },
    WS: {
        writable: false,
        value(uri, protocols) {

            if (!uri) uri = document.location.origin;

            uri = getPath(uri);
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
                    callback && callback(html),
                    load_page(url)
                ]);
            });
        }
    },
    load_page: {
        writable: false,
        value(uri) {

            let list;

            Promise.all($autoload_all.map(fn => fn()));

            if (list = $autoload_page[getPath(uri)]) {
                Promise.all(list.map(fn => fn()));
            }
        }
    },
    page: {
        writable: false,
        value(uri, fn) {
            switch (typeof uri) {
                case "string":
                    if (typeof fn === "function") {
                        let path = getPath(uri);
                        if (!$autoload_page[path]) $autoload_page[path] = [];
                        $autoload_page[path].push(fn);
                    }
                    break;

                case "function":
                    $autoload_all.push(uri);
                    break;

                case "object":
                    if (typeof fn === "function" && uri.length) {
                        for (var i = 0, n = uri.length; i < n; i++) {
                            var path = getPath(uri[i]);
                            if (!$autoload_page[path]) $autoload_page[path] = [];
                            $autoload_page[path].push(fn);
                        }
                    }
                    break;
            }
        }
    }
});