const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require("yavi/db/mongo/posts/statics");
const Post = mongoose.model("Post", schema);

statics(Post);

module.exports = Post;