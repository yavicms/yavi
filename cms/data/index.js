const plugins = require('./plugins');
const users = require('./users');
const tags = require('./tags');
const posts = require('./posts');
const comments = require('./comments');

module.exports = function (app) {

    plugins(app);

    users(app);

    tags(app);

    posts(app);

    comments(app);
}