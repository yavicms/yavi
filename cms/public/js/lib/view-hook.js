const { loop } = require("yavi/lib");

function ViewHook(node, hook_key) {

    let $this = {
        get append() {
            return function (props) {
                node.emit(hook_key, props, "append");
            }
        },
        get prepend() {
            return function (props) {
                node.emit(hook_key, props, "prepend");
            }
        },
        get remove() {
            return function (props) {
                node.emit(hook_key, props, "remove");
            }
        },
        get set() {
            return function (props) {
                node.emit(hook_key, props, "replace");
            }
        },
        get emit() {
            return function (...params) {
                node.emit(hook_key).then(function (list) {
                    loop(list, function (array) {

                        let [start, end] = array;
                        let next = start.nextSibling;

                        while (next !== end) {
                            next.emit(...params);
                            next = next.nextSibling;
                        }

                    });
                });
            }
        }
    };

    return $this;
};

module.exports = ViewHook;