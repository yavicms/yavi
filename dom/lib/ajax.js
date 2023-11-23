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

module.exports = class Ajax {

    #$x = new XMLHttpRequest();
    #$a = document.createElement("a");
    #$define = {
        header: { "X-Requested-With": "XMLHttpRequest" },
        method: "get",
        type: "json"
    };

    constructor(options) {
        Object.assign(this, options);

        this.#$x.open(this.method, this.#$a.href, true);
        this.#$x.send(this.#$define.data);
    }

    set method(method) {
        this.#$define.method = method.toUpperCase();
    }
    set url(url) {
        this.#$a.href = url;
    }
    set type(type) {
        if (!is(type, "undefined")) this.#$define.type = type;
    }
    set header(header) {
        loop(Object.assign(this.#$define.header, header),
            ($header, $key) => this.#$x.setRequestHeader($key, $header));
    }
    set query(data) {

        switch (is(data)) {

            case "string":
                this.#$a.search = data;
                break;

            case "object":
                let array = [this.#$a.search];
                loop(data, (value, key) => array.push(`${key}=${value}`));
                this.#$a.search = array.join("&");
                break;
        }
    }
    set data(data) {
        if (is(data, "object")) {
            this.#$define.header["Content-Type"] = "GET" === this.method ? "text/plain" : "application/json";
            this.#$define.data = JSON.stringify(data);
        }
    }
    set file(file) {
        this.method = "post";
        this.type = "text";
        this.#$define.header["Content-Type"] = file.type;
        this.#$define.data = file;
        this.hasFile = true;
    }
    set success(fn) {
        var type = this.#$define.type;

        try {
            if (typeof fn === "function") {
                this.#$x.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        switch (type) {
                            case "json":
                                return fn(JSON.parse(this.responseText));
                            case "html":
                                return fn(domParser.parseFromString(this.responseText, "text/html"));
                            case "text":
                                return fn(this.responseText);
                            default:
                                throw fn(`Ajax Error: Has not response type: ${type}`);
                        }
                    }
                }
            }

        } catch (error) {
            throw error;
        }
    }
    set progress(fn) {
        if (is(fn, "function")) {
            if (this.hasFile) {
                this.#$x.upload.onprogress = e => fn(e.loaded / e.total)
            } else {
                this.#$x.onprogress = e => fn(e.loaded)
            }
        }
    }
    set error(fn) {
        if (is(fn, "function")) this.#$x.onerror = fn;
    }

    get method() {
        return this.#$define.method;
    }

    static #callAjax(options) {
        return new Promise(function (success, error) {
            options.success = success;
            options.error = error;
            new Ajax(options);
        });
    }
    static get(url, data) {
        return this.#callAjax({ method: "get", url, data });
    }
    static put(url, data) {
        return this.#callAjax({ method: "put", url, data });
    }
    static post(url, data) {
        return this.#callAjax({ method: "post", url, data });
    }
    static delete(url, data) {
        return this.#callAjax({ method: "delete", url, data });
    }
    static html(url, data) {
        return this.#callAjax({ method: "get", type: "html", url, data });
    }
    static text(url, data) {
        return this.#callAjax({ method: "get", type: "text", url, data });
    }
    static json(url, data) {
        return this.#callAjax({ method: "get", type: "json", url, data });
    }
    static upload(url, file, progress) {
        return new Promise((success, error) =>
            new Ajax({ url, file, success, error, progress }));
    }
}
