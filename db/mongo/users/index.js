const mongoose = require('mongoose');
const schema = require('./schema');
const methods = require('./methods');
const User = mongoose.model("User", schema);

methods(User);

module.exports = User;