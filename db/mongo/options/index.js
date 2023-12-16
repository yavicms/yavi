const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require("./statics");
const Option = mongoose.model("Option", schema);

statics(Option);

module.exports = Option;