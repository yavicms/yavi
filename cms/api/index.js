const user_props = require('./props-user');
const post_props = require('./props-post');
const user = require('./user');
const post = require('./post');
const comment = require('./comment');
const plugin = require('./plugin');

module.exports = function (app) {

    /**
     * API cho ( plugin/theme/admin )
     */
    plugin(app);

    user_props(app);
    post_props(app);

    /**
     *  API cho ( users )
     */
    user(app);

    /**
     *  API cho ( posts )
     */
    post(app);

    /**
     *  API cho ( comments )
     */
    comment(app);
}