const Parser = new DOMParser();
const ViewData = require("./view-data");
const { $notext, loop } = require("yavi/lib");

function View($text, $props, callback) {

    $text = $text.replace(/[\n\r\t]+/g, $notext).replace(/\s{2,}/g, $notext);

    let props = new ViewData($props);
    let text = ViewData.html($text, props);
    let node = Parser.parseFromString(text, "text/html").body.childNodes[0];

    node.__text = $text;
    node.__callback = callback;
    node.__props = $props;

    if (props.$views.length) {
        loop(node.querySelectorAll(".view-data-location"), function ($node, index) {
            $node.insertAdjacentElement('beforebegin', props.$views[index]);
            $node.remove();
        });
    }

    callback && callback(node);

    return node;
};

Object.defineProperty(View, "render", {
    writable: false,
    value(parent, node) {
        switch (typeof parent) {
            case "string":
                parent = document.querySelector(parent);
            case "object":
                parent.innerHTML = $notext;
                parent.append(node);
                break;
        }
    }
});

window.View = View;
