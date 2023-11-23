const mongoose = require('mongoose');
const schema = require('./schema');
const methods = require('./methods');

const Post = mongoose.model("Post", schema);

methods(schema, Post);

module.exports = Post;