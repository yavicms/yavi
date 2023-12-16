const add = require("./add");
const edit = require("./edit");
const remove = require("./delete");

module.exports = function (app) {

    add(app);

    edit(app);

    remove(app);
}