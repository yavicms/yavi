const Parser = new DOMParser();
const ViewData = require("./view-data");
const { loop } = require("yavi/lib");

function View($text, $props, callback) {

    let props = new ViewData($props);
    let text = ViewData.html($text, props);
    let node = Parser.parseFromString(text, "text/html").body.childNodes[0];

    node.__text = $text;
    node.__callback = callback;
    node.__props = $props;
    node.__ishook = 1;

    if (props.__hooks) {
        loop(props.__hooks, function (hook, name) {

            let $event_name = ".hook-" + name, $hook;

            loop(node.querySelectorAll($event_name), function (child) {
                let frag = document.createDocumentFragment();
                let start = document.createComment("start");
                let end = document.createComment("end");

                $hook = !$hook ? hook : View(hook.__text, hook.__props, hook.__callback);

                frag.append(start);
                frag.append($hook);
                frag.append(end);

                node.on($event_name, function ($propsX, $actionName) {

                    if (!arguments.length) return [start, end];

                    if (!$propsX) $propsX = hook.__props;

                    switch ($actionName) {
                        case "append":
                            node.insertBefore(View(hook.__text, $propsX, hook.__callback), end);
                            break;

                        case "prepend":
                            node.insertBefore(View(hook.__text, $propsX, hook.__callback), start.nextSibling);
                            break;

                        case "remove":
                            var $elm = start.nextSibling;
                            while ($elm !== end) {
                                $elm.remove();
                                $elm = start.nextSibling;
                            }
                            break;

                        default:
                            var $elm = start.nextSibling;
                            while ($elm !== end) {
                                $elm.remove();
                                $elm = start.nextSibling;
                            }
                            node.insertBefore(View(hook.__text, $propsX, hook.__callback), end);
                            break;
                    }
                });

                node.insertBefore(frag, child);
                child.remove();
            });
        });
    }

    callback && callback(node);

    return node;
};

Object.defineProperty(View, "render", {
    writable: false,
    value(node, parent) {
        switch (typeof parent) {
            case "string":
                document.querySelector(parent).append(node);
                break;
            case "object":
                parent.append(node);
                break;
        }
    }
});

window.View = View;
