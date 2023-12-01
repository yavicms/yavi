const mongoose = require('mongoose');
const schema = require('./schema');
const statics = require('./statics');

module.exports = function (collection, model) {
    const PostProps = mongoose.model(model, schema(collection));

    statics(PostProps);

    return PostProps;
}