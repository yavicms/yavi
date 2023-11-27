const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require('./statics');
const User = mongoose.model("User", schema);

statics(User);

module.exports = User;