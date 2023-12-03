const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require("./statics");
const Post = mongoose.model("Post", schema);

statics(Post);

module.exports = Post;