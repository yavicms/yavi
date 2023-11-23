module.exports = function Menu(array, parent, index, max) {

    let tree = [], row;

    if (!max) {
        index = 0;
        max = array.length;
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