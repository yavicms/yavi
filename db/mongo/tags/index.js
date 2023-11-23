const mongoose = require('mongoose');
const schema = require('./schema');
const methods = require('./methods');

const Tag = mongoose.model("Tag", schema);

methods(schema, Tag);

module.exports = Tag;