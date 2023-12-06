const { is, qs, Event } = require("yavi/lib");
const domParser = new DOMParser();
const notmatch = new RegExp("^/(public|favicon)");

/**
 * Sử dụng WebSocket
 * 
 *  var socket = new WS("http://localhost:80");
 *  
 *  Gửi dữ liệu lên Server:
 *  socket.emit("event_name", object_data, function(object_data){});
 * 
 *  Nhận dữ liệu từ Server
 *  socket.on("event_name", function(object_data){});
 * 
 *  Gửi dữ liệu dưới dạng Ajax
 *  socket.get("/posts/1234").then(function);
 * 
 *  Phương thức POST - PUT - DELETE
 *  socket.post("/posts/add", {content: "Bài viết mới"})).then(function);
 *  
 *  Gửi bài viết mới đến tất cả mọi người
 *  socket.on("/posts/add", function(post){});
 * 
 */

module.exports = class WS {

    #$statusEvents = new Event();
    #$events = {};
    #$event = {};
    #$wait = [];
    #$ws = null;
    #$connected = false;
    #reloadcount = 0;

    constructor(uri, protocols, options) {
        this.#$ws = new WebSocket(uri, protocols, options);
        this.#$ws.onmessage = e => this.#message(JSON.parse(e.data));
        this.#$ws.onopen = e => {
            this.connected(true);
            this.#$statusEvents.emit("open", e);
        };
        this.#$ws.onerror = e => {
            this.connected(false);
            this.#$statusEvents.emit("error", e);
        };
        this.#$ws.onclose = e => {
            this.connected(false);
            this.#$statusEvents.emit("close", e);
        };
    }
    connected(value) {
        if (typeof value === "undefined") return this.#$connected;
        this.#$connected = value;
    }
    open(fn) {
        this.#$statusEvents.on("open", fn);
    }
    error(fn) {
        this.#$statusEvents.on("error", fn);
    }
    close(fn) {
        this.#$statusEvents.on("close", fn);
    }

    /**
     * Array Data From Server
     * array = [event_name, object_data, is_function]
     */
    #message(array) {
        if (array[2]) {
            let fn = this.#$event[array[0]];
            if (typeof fn === "function") fn(array[1]);
        } else {
            let $events = this.#$events[array[0]];
            if ($events.length) $events.forEach(fn => fn(array[1]));
        }
    }

    #parseData(key, data, fn) {
        var isfn = 0;

        if ('function' === typeof fn) {
            this.#$event[key] = fn;
            isfn = 1;
        }

        return [key, data, isfn];
    }

    emit(key, data, fn) {
        this.#send(this.#parseData(key, data, fn));
    }

    on(key, fn) {
        if (!this.#$events[key]) this.#$events[key] = [];
        this.#$events[key].push(fn);
    }

    #send(array) {
        let self = this;
        let json = JSON.stringify(array);

        setTimeout(function Reconnect() {
            if (!self.#$connected) {
                self.#$wait.push(json);
                setTimeout(Reconnect, 10);
                return;
            }

            if (self.#$wait.length) {
                self.#$wait.forEach(data => self.#$ws.send(data));
                self.#$wait = [];
                return;
            }

            if (self.#reloadcount++ > 100) {
                clearTimeout(Reconnect);
                return;
            }

            self.#$ws.send(json);
        });
    }

    /**
     *  Lấy dữ liệu HTML
     *  socket.html("http://localhost:80/")
     */
    html(path, body) {
        return new Promise((success, error) =>
            this.request({
                path,
                body,
                method: 'get',
                type: 'html',
                success(text) {
                    if (typeof text === "string") {
                        success(domParser.parseFromString(text, 'text/html'));
                    } else {
                        error();
                    }
                },
                error
            }));
    }

    json(...params) {

        let options;

        switch (params.length) {
            /**
             * Trường hợp 1: đầu vào là 1 object: {url, method, path, data, ...}
             */
            case 1:
                if (is.object(params[0])) options = params[0];
                break;
            /**
             * Trường hợp 2: có url và data
             */
            case 2:
                options = { path: params[0], body: params[1], method: "get" };
                break;

            /**
             * Trường hợp 3:
             */
            case 3:
                options = { method: params[0], path: params[1], body: params[2] };
                break;

        }

        if (!options) return Promise.reject();

        return new Promise((success, error) =>
            this.request(Object.assign(options, {
                type: "json",
                success(message) {
                    typeof message === "object"
                        ? success(message)
                        : error();
                },
                error
            })));
    }

    /**
     *  Gửi dữ liệu lên http server tương tự ajax:
     *      - options: { 
     *          path: url-web,          -> uri của web:     https://localhost/path/name?qs1=abc&qs2=123
     *          query: query-string,    -> query của url:   { qs1: "abc", qs2: 123 }
     *          body: object-data,      -> dữ liệu form:    { name, email, pass, ... }
     *          type: response-type     -> content-type mà server trả về: html, json
     *        }
     */
    request(options) {
        if (typeof options !== "object") return;
        if (notmatch.test(options.path)) return;

        let a = document.createElement("a");
        let fn = options.success;

        a.href = options.path;
        options.path = a.pathname;
        options.query = qs(a.search);

        if (!options.method) options.method = "get";
        if (!options.type) options.type = "json";

        this.emit("http.request", options, fn);
    }
    httpRequest(method, path, body) {
        return (new Promise((success, error) =>
            this.request({ type: "json", method, path, body, success, error })))
            .then(function (response) {
                if (response.type === "success") {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            });
    }
    get(path, query, headers) {
        return this.httpRequest("get", path, query, headers);
    }
    put(path, body, headers) {
        return this.httpRequest("put", path, body, headers);
    }
    post(path, body, headers) {
        return this.httpRequest("post", path, body, headers);
    }
    delete(path, body, headers) {
        return this.httpRequest("delete", path, body, headers);
    }
    api(method, path, body, headers) {
        return new Promise((success, error) =>
            this.request({ headers, method, body, success, error, path: "/api/" + path }));
    }
}