const mongoose = require('mongoose');
const schema = require('./schema');
const methods = require('./methods');

const Comment = mongoose.model("Comment", schema);

methods(schema, Comment);

module.exports = Comment;