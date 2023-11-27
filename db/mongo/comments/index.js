const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require('./statics');
const Comment = mongoose.model("Comment", schema);

statics(Comment);

module.exports = Comment;