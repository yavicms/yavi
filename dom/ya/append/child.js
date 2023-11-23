const AppendSateArray = require("./state-array");
const AppendSateText = require("./state-text");
const { loop } = require("yavi/lib");

module.exports = function AppendChild(children, node) {

    switch (children.length) {

        case undefined:
            node.append(children);
            break;

        case 0:
            break;

        default:
            for (let i = 0, n = children.length; i < n; i++) {

                (function (child) {

                    switch (typeof child) {

                        case "string":
                        case "number":
                            node.insertAdjacentHTML("beforeend", child);
                            break;

                        case "function":
                            child(node);
                            break;

                        case "object":
                            if (typeof child.length === "number") {
                                AppendChild(child, node);
                            }
                            /**
                             *  Nếu child là 1 HTML document,
                             *  thì append nó vào node
                             */
                            else if (child.nodeType) {
                                node.append(child);
                            }
                            /**
                             *  Nếu là 1 Array State,
                             *  thì lắng nghe sự kiện $event.on
                             */
                            else if (child.isStateArray) {
                                AppendSateArray(child, node);
                            }
                            /**
                             *  Nếu là 1 Text State,
                             *  thì lắng nghe sự kiện $event.on
                             */
                            else if (child.isStateText) {
                                AppendSateText(child, node);
                            } else {
                                console.log("con gi nua? ", child);
                            }
                            break;
                    }

                })(children[i]);

            }
            break;
    }

    return node;
};