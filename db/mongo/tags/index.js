const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require('./statics');
const Tag = mongoose.model("Tag", schema);

statics(Tag);

module.exports = Tag;