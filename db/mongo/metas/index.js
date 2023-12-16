const mongoose = require('mongoose');
const schema = require('./schema');
const Meta = mongoose.model("Meta", schema);

module.exports = Meta;