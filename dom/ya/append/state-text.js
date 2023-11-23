
module.exports = function AppendStateText($event, node) {

    let textNode = document.createTextNode($event.value);

    node.appendChild(textNode);

    $event.on((text) => textNode.nodeValue = text);

    return node;
}
