/**
 *  Yavi - CMS for Nodejs
 *  
 *  Gửi yêu cầu Ajax đến máy chủ HTTP
 * 
 *  Sử dụng phương thức : get , put , post , delete
 *  ajax.get("url", data).then(success).catch(error);
 * 
 *  Lấy HTML từ trang web , trả về DOM Elements
 *  ajax.html("url", data).then(success).catch(error);
 * 
 *  Lấy Text từ trang web
 *  ajax.text("url", data).then(success).catch(error);
 * 
 *  Upload File lên server
 *  ajax.upload("url", file).then(success).catch(error);
 * 
 */
const domParser = new DOMParser();
const { is } = require("yavi/lib");

class Ajax {

    $options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Yavi-Type": "json"
        }
    };
    $defines = {
        type: "json",
        action: "json"
    };
    $a = document.createElement("a");

    constructor(options) {
        if (typeof options === "object") Object.assign(this, options);

        this.$x = fetch(this.$a.href, this.$options);
    }

    set method(method) {
        this.$options.method = method.toUpperCase();
    }
    set headers(headers) {
        Object.assign(this.$options.headers, headers);
    }
    set url(url) {
        this.$a.href = url;
    }
    set type(type) {
        switch (type) {
            case "json":
                this.$options.headers["X-Yavi-Type"] = "json";
                this.$options.headers["Content-Type"] = "application/json";
                break;

            case "text":
            case "html":
                this.$options.headers["X-Yavi-Type"] = "html";
                this.$options.headers["Content-Type"] = "text/plain";
                break;
        }
    }
    set query(query) {

        switch (is(query)) {

            case "string":
                this.$a.search = query;
                break;

            case "object":
                let array = [this.$a.search];
                loop(query, (value, key) => array.push(`${key}=${value}`));
                this.$a.search = array.join("&");
                break;
        }
    }
    set body(body) {
        if (typeof body === "object") {
            this.type = "json";
            this.$options.body = JSON.stringify(body);
        }
    }
}

Object.defineProperties(Ajax, {
    text: {
        writable: false,
        value(url, options) {
            options.url = url;
            options.type = "text";
            options.method = "get";
            return (new Ajax(options)).$x
                .then((response) => response.text());
        }
    },
    html: {
        writable: false,
        value(url, options) {
            options.url = url;
            options.type = "html";
            options.method = "get";
            return (new Ajax(options)).$x
                .then((response) => response.text())
                .then((text) => domParser.parseFromString(text, "text/html"));
        }
    },

    json: {
        writable: false,
        value(url, options) {
            options.url = url;
            options.type = "json";
            return (new Ajax(options)).$x
                .then((res) => res.json())
                .then(function (r) {
                    if (r.type === "success") {
                        return r.data;
                    } else {
                        throw r.message;
                    }
                });
        }
    },
    get: {
        writable: false,
        value(url, query, headers) {
            return Ajax.json(url, { query, headers, method: "get" });
        }
    },
    put: {
        writable: false,
        value(url, body, headers) {
            return Ajax.json(url, { body, headers, method: "put" });
        }
    },
    post: {
        writable: false,
        value(url, body, headers) {
            return Ajax.json(url, { body, headers, method: "post" });
        }
    },
    delete: {
        writable: false,
        value(url, body, headers) {
            return Ajax.json(url, { body, headers, method: "delete" });
        }
    },

    upload: {
        writable: false,
        value(url, files, progress) { }
    },
    download: {
        writable: false,
        value() { }
    }
});

Object.defineProperty(window, "ajax", {
    writable: false,
    value: Ajax
});
