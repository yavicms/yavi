const { loop, Event, is } = require("yavi/lib");

class ViewEvents {
    $events = {};
    $docs = [];

    constructor($document, isfilter, isarray) {
        switch (is($document)) {
            case "string":
                this.$docs = document.querySelectorAll($document);
                break;

            case "object":
                this.$docs.push($document);
                break;

            case "array":
                if (isfilter && isarray) {
                    // $document = [ [], [], ... ]
                    var docs = [];
                    loop($document, function (list) {
                        loop(list, function (doc) {
                            docs.push(doc);
                        });
                    });
                    this.$docs = docs;
                }
                else {
                    this.$docs = $document;
                }
                break;
        }
    }
}

function getEventFunction($this, eventname, e) {
    var events = $this.$events[eventname],
        current_element = e.target,
        next = 1;

    events.loop(function (callbacks, selector) {

        if (!selector) return;

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
            next = 0;
            return 1;
        }
    });

    if (next) {
        Promise.all(events.get("null").map(fn => fn.call($this.$docs[0], e)));
    }
};

const ListProtos = [
    ["loop", function (callback) {
        loop(this.$docs, callback);
        return this;
    }],
    ["on", function (name, selector, callback) {

        if (arguments.length === 2) {
            callback = selector;
            selector = null;
        }

        if (!this.$events[name]) {
            this.$events[name] = new Event();
            this.$docs[0].addEventListener(name, (e) =>
                getEventFunction(this, name, e));
        }
        this.$events[name].on(selector, callback);

        return this;
    }],

    /**
     * Render: html/document
     */
    ["html", function (html) {
        switch (typeof html) {

            case "object":
                return this.loop(function ($doc) {
                    $doc.innerHTML = "";
                    $doc.append(html);
                });

            case "undefined":
                return this.$docs[0].innerHTML;

            default:
                return this.loop(function ($doc) { $doc.innerHTML = html; });
        }
    }],
    ["text", function (text) {
        if (!arguments.length) return this.$docs[0].innerText;
        return this.loop(function ($doc) { $doc.innerText = text; });
    }],
    ["append", function ($e) {
        return this.loop(function ($doc) { $doc.append($e) });
    }],
    ["prepend", function ($e) {
        return this.loop(function ($doc) { $doc.prepend($e); });
    }],
    ["after", function ($e) {
        return this.loop(function (doc) {
            doc.insertAdjacentElement('afterend', $e);
        });
    }],
    ["before", function ($e) {
        return this.loop(function (doc) {
            doc.insertAdjacentElement('beforebegin', $e);
        });
    }],

    /**
     * find document
     */
    ["map", function (callback) {
        return this.$docs.map(callback);
    }],
    ["filter", function (callback) {
        return this.$docs.filter(callback);
    }],
    ["find", function ($s) {
        return new ViewEvents(this.filter($doc => $doc.querySelectorAll($s)), 1);
    }],
    ["children", function ($s) {

        var $docs, isarray = 1;

        switch (typeof $s) {
            case "undefined":
                $docs = this.filter($doc => $doc.childNodes);
                break;
            case "string":
                $docs = this.filter($doc => $doc.querySelectorAll($s));
                break;
            case "number":
                $docs = this.filter($doc => $doc.childNodes[$s]);
                isarray = 0;
                break;
            default:
                return;
        }

        return new ViewEvents($docs, 1, isarray);
    }],
    ["parent", function ($s) {

        var $docs;

        switch (typeof $s) {
            case "string":
                $docs = this.filter($doc => $doc.parentElement);
                break;

            case "undefined":
                $docs = this.filter($doc => $doc.closest($s));
                break;

            default:
                return;
        }

        return new ViewEvents($docs, 1, 0);
    }],
    ["next", function ($s) {

        var docs;

        switch (typeof $s) {
            case "undefined":
                docs = this.filter((doc => doc.nextSibling));
                break;

            case "string":
                docs = this.filter(function (doc) {
                    var next = doc.nextSibling;
                    while (next) {
                        if (next.matches($s)) return next;
                        next = next.nextSibling;
                    }
                });
                break;

            default:
                return;
        }

        return new ViewEvents(docs, 1, 0);
    }],
    ["prev", function ($s) {

        var docs;

        switch (typeof $s) {
            case "undefined":
                docs = this.filter((doc => doc.previousSibling));
                break;

            case "string":
                docs = this.filter(function (doc) {
                    let prev = doc.previousSibling;
                    while (prev) {
                        if (prev.matches($s)) return prev;
                        prev = prev.previousSibling;
                    }
                });
                break;

            default:
                return;
        }

        return new ViewEvents(docs, 1, 0);
    }],
    ["first", function () {
        return this.children(0);
    }],
    ["last", function () {
        return this.filter(function (doc) {
            return doc.childNodes[(doc.childNodes.length - 1)];
        });
    }],

    /**
     * Style sheet
     */
    ["css", function (options, value) {
        switch (typeof options) {
            case "string":
                return !value
                    ? this.$docs[0].style[options]
                    : this.loop(function (doc) { doc.style[options] = value; });

            case "object":
                return this.loop(function (doc) {
                    loop(options, function (value, key) {
                        doc.style[key] = value;
                    });
                });
        }
        return this;
    }],
    ["show", function () {
        return this.loop(function (doc) {
            doc.style.display = "";
        });
    }],
    ["hide", function () {
        return this.loop(function (doc) {
            doc.style.display = "none";
        });
    }],
    ["toggle", function () {
        return this.loop(function (doc) {
            doc.style.display = doc.style.display === "none" ? "" : "none";
        });
    }],

    /**
     * ClassList
     */
    ["addClass", function (name) {
        return this.loop(function (doc) { doc.classList.add(name); });
    }],
    ["removeClass", function (name) {
        return this.loop(function (doc) { doc.classList.remove(name); });
    }],
    ["replaceClass", function (name) {
        return this.loop(function (doc) { doc.classList.replace(name); });
    }],
    ["toggleClass", function (name) {
        return this.loop(function (doc) {
            doc.classList.contains(name)
                ? doc.classList.remove(name)
                : doc.classList.add(name);
        });
    }]
];

ListProtos.forEach((r) =>
    Object.defineProperty(ViewEvents.prototype, r[0], {
        writable: false,
        value: r[1]
    }));

module.exports = ViewEvents;