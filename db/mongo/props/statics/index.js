const type = require('./type');
const search = require('./search');

module.exports = function (model) {

    type(model);

    search(model);
}