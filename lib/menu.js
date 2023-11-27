const is = require('yavi/lib/is');

module.exports = function Menu(array, parent, index, max) {

    let tree = [], row;

    if (max === undefined) {
        index = 0;
        if (is.array(array)) max = array.length;
        else return tree;
    }

    for (; index < max; index++) {
        row = array[index];

        if (row.parent == parent) {
            row.children = Menu(array, row.name, index, max);
            tree.push(row);
        }
    }

    return tree;
}