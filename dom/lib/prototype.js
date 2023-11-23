const Event = require("yavi/lib/event");
const View = require("./view");
const Hook = require("./view-hook");

Object.defineProperties(HTMLElement.prototype, {

    html: {
        writable: false,
        value(text) {
            switch (typeof text) {
                case "undefined":
                    return this.innerHTML;
                case "string":
                case "number":
                    this.innerHTML = text;
                    break;
                case "object":
                    if (text.nodeType) {
                        this.innerHTML = "";
                        this.append(text);
                    }
                    break;
            }

            return this;
        }
    },
    text: {
        writable: false,
        value(text) {
            switch (typeof text) {
                case "undefined":
                    return this.innerText;
                case "string":
                case "number":
                    this.innerText = text;
                    break;
                case "object":
                    if (text.nodeType) {
                        this.innerText = text.innerText;
                    }
                    break;
            }

            return this;
        }
    },
    val: {
        writable: false,
        value(value) {
            if (value === undefined) return this.value;
            else this.value = value;
            return this;
        }
    },

    css: {
        writable: false,
        value(options, value) {
            switch (typeof options) {
                case "object":
                    for (let key in options) {
                        this.style[key] = options[key];
                    }
                    break;
                case "string":
                    if (!value) return this.style[options];
                    else this.style[options] = value;
                    break;
            }

            return this;
        }
    },
    toggle: {
        writable: false,
        value() {
            this.style.display = this.style.display === "none" ? "" : "none";
        }
    },
    show: {
        writable: false,
        value() {
            this.style.display = "";
            return this;
        }
    },
    hide: {
        writable: false,
        value() {
            this.style.display = "none";
            return this;
        }
    },

    toggleClass: {
        writable: false,
        value(className) {
            if (this.classList.contains(className))
                this.classList.remove(className);
            else
                this.classList.add(className);
            return this;
        }
    },
    addClass: {
        writable: false,
        value(className) {
            this.classList.add(className);
            return this;
        }
    },
    removeClass: {
        writable: false,
        value(className) {
            this.classList.remove(className);
            return this;
        }
    },
    changeClass: {
        writable: false,
        value($old, $new) {
            this.classList.replace($old, $new);
            return this;
        }
    },

    attr: {
        writable: false,
        value(options, value) {
            switch (typeof options) {
                case "object":
                    for (let key in options) {
                        this.setAttribute(key, value);
                    }
                    break;
                case "string":
                    if (value === undefined) return this.getAttribute(options);
                    else this.setAttribute(options, value);
                    break;
            }
            return this;
        }
    },

    __events: {
        writable: false,
        value: new Event()
    },
    on: {
        writable: false,
        value(name, callback) {
            this.__events.on(name, callback);
            return this;
        }
    },
    emit: {
        writable: false,
        value(...params) {
            return this.__events.emit.apply(this.__events, params);
        }
    },
    hook: {
        writable: false,
        value(hook_name) {
            return Hook(this, ".hook-" + hook_name);
        }
    },

    prev: {
        get() {
            return this.previousSibling;
        }
    },
    next: {
        get() {
            return this.nextSibling;
        }
    },
    parent: {
        writable: false,
        value(selector) {
            if (!selector) return this.parentNode;
            return this.closest(selector);
        }
    },

    find: {
        writable: false,
        value(selector) {
            switch (typeof selector) {
                case "number":
                    return [this.childNodes[selector]];
                case "string":
                    return this.querySelectorAll(selector);
            }
        }
    },
    findOne: {
        writable: false,
        value(selector) {
            switch (typeof selector) {
                case "number":
                    return this.childNodes[selector];
                case "string":
                    return this.querySelector(selector);
            }
        }
    },

    copy: {
        writable: false,
        value(props) {
            return View(this.__text, props || this.__props, this.__callback);
        }
    }

});