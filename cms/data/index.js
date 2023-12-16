const plugins = require('./plugins');
const users = require('./users');
const tags = require('./tags');
const posts = require('./posts');
const comments = require('./comments');
const metas = require('yavi/cms/data/metas');

module.exports = function (app) {

    plugins(app);

    metas(app);

    users(app);

    tags(app);

    posts(app);

    comments(app);
}