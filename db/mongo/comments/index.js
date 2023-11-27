const mongoose = require('mongoose');
const schema = require('./schema');
const methods = require('./methods');

methods(schema);

module.exports = mongoose.model("Comment", schema);