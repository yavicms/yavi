const domParser = new DOMParser();
const BodyEvents = {};
const { loop, is, Event } = require("yavi/lib");

class YaviDocument {

    #$selector = null;

    constructor(selector) {
        this.#$selector = {
            type: is(selector),
            value: selector
        };
        if (this.#$selector.type === "string" && /\</.test(selector)) {
            this.#$selector.type = "object";
            this.#$selector.value = domParser.parseFromString(selector, "text/html").document.childNodes;
        };
    }
    get selector() {

        switch (this.#$selector.type) {

            case "string":
                return document.querySelectorAll(this.#$selector.value);

            case "object":
                return [this.#$selector.value];

            case "array":
                return this.#$selector.value;

            default:
                return [];
        }
    }
    loop(callback) {
        loop(this.selector, callback);
        return this;
    }
    /**
     * Events
     */
    #getEventFunction(event_name, e) {
        let events = BodyEvents[event_name];
        let current_element = e.target;

        loop(events, function (selector, callbacks) {
            let $element, $current = current_element;

            for (let i = 0; i < 3; i++) {
                if (!$current) break;
                if (!$current.matches(selector)) {
                    $current = $current.parentElement;
                    continue;
                } else {
                    $element = $current;
                    break;
                }
            }

            if ($element) {
                Promise.all(callbacks.map(fn => fn.call($element, e)));
                return 1;
            }
        });
    }
    /**
     * 
     * @param {String} event_name : click, ...
     * @param {Function} callback 
     * @returns 
     */
    on(event_name, callback) {
        return this.DomEvent(event_name, callback);
    }
    DomEvent(name, callback) {
        switch (this.#$selector.type) {

            case "object":
                this.#$selector.value.addEventListener(name, callback);
                break;

            case "string":

                if (!BodyEvents[name]) {
                    BodyEvents[name] = new Event();
                    document.addEventListener(name, e => this.#getEventFunction(name, e));
                }

                BodyEvents[name].on(this.#$selector.value, callback);

                break;
        }
        return this;
    }
    /**
     * $("div").html()      => return html
     * $("div").html(text)  => render text to html
     */
    DomRender(action, value) {

        switch (this.#$selector.type) {

            case "string":
                switch (is(value)) {
                    case "string":
                        this.loop(selector => selector[action] = value);
                        break;
                    case "function":
                        this.loop(selector => value.call(selector, selector[action]));
                        break;
                    case "undefined":
                        return document.querySelector(this.#$selector.value)[action];
                }
                break;

            case "object":
                switch (is(value)) {
                    case "string":
                        this.#$selector.value[action] = value;
                        break;
                    case "function":
                        value.call(
                            new YaviDocument(this.#$selector.value),
                            this.#$selector.value[action]);
                        break;
                    case "undefined":
                        return this.#$selector.value[action];
                }
                break;
        }
        return this;
    }

    /**
     *  
     */
    DomAction(action, value) {
        if (is.object(value) && value.$selector) {
            value = value.$selector.value;
        }
        return this.ListClassAction(action, value);
    }

    ListClassAction(action, value) {
        this.loop(selector => selector[action](value));
        return this;
    }

    toggle() {
        return this.loop(selector =>
            selector.style.display =
            selector.style.display == "none"
                ? "block !important"
                : "none !important");
    }
    parent($selector, callback) {
        return this.loop(selector =>
            $selector ? selector.closest($selector) : selector.parentElement);
    }
    children($selector, callback) {

        let docs = [];

        switch (is($selector)) {

            case "number":
                if (is(callback, "function")) {
                    loop(this.selector, function (selector) {
                        let $s = selector.childNodes[$selector];
                        if ($s) callback(new YaviDocument($s));
                    });
                } else {
                    loop(this.selector, function (selector) {
                        let $s = selector.childNodes[$selector];
                        if ($s) docs.push($s);
                    });
                }
                break;

            case "string":
                if (is.function(callback)) {
                    this.loop(function (selector) {
                        loop(selector.querySelectorAll($selector), ($s) =>
                            callback(new YaviDocument($s)));
                    });
                } else {
                    this.loop(function (selector) {
                        loop(selector.querySelectorAll($selector), ($s) => docs.push($s));
                    });
                }
                break;
        }
        return docs.length ? new YaviDocument(docs) : this;
    }
    css(options) {
        switch (is(options)) {
            case "object":
                this.loop(selector =>
                    loop(options, (value, key) => selector.style[key] = value));
                break;

            case "string":
                let selector = this.selector[0];
                return selector ? selector.style[options] : null;
        }
    }
};

const ListPrototypes = [

    /**
     * 
     */
    ["toggleClass", "ListClassAction", "toggle"],
    ["addClass", "ListClassAction", "add"],
    ["removeClass", "ListClassAction", "remove"],


    /**
     *  Đăng kí các Events
     */
    ["click", "DomEvent"],
    ["dblclick", "DomEvent"],
    ["focus", "DomEvent"],
    ["keydown", "DomEvent"],
    ["keypress", "DomEvent"],
    ["keyup", "DomEvent"],
    ["load", "DomEvent"],
    ["scroll", "DomEvent"],
    ["mousedown", "DomEvent"],
    ["mouseenter", "DomEvent"],
    ["mouseleave", "DomEvent"],
    ["mousemove", "DomEvent"],
    ["mouseover", "DomEvent"],
    ["mouseout", "DomEvent"],
    ["mouseup", "DomEvent"],
    ["change", "DomEvent"],
    ["select", "DomEvent"],
    ["submit", "DomEvent"],

    /**
     * 
     */
    ["append", "DomAction"],
    ["prepend", "DomAction"],
    ["after", "DomAction"],
    ["before", "DomAction"],

    /**
     * 
     */
    ["html", "DomRender", "innerHTML"],
    ["text", "DomRender", "innerText"],
    ["last", "DomRender", "lastElementChild"],
    ["first", "DomRender", "firstElementChild"],
    ["next", "DomRender", "nextElementSibling"]
];

loop(ListPrototypes, function ($list) {
    Object.defineProperty(YaviDocument.prototype, $list[0], {
        value(action) {
            return this[$list[1]]($list[2] || $list[0], action);
        },
        writable: false
    })
});

module.exports = YaviDocument;