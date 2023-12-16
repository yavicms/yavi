const user_props = require('./props-user');
const post_props = require('./props-post');
const user = require('./user');
const post = require('./post');
const comment = require('./comment');
const plugin = require('./plugin');

const checkToken = require("yavi/cms/mw/check-token");
const meta = require('./meta');

module.exports = function (app) {

    /**
     * check login
     */
    app.use("api", checkToken((req, res) => res.error("error_not_signed")));

    /**
     * API cho ( plugin/theme/admin )
     */
    plugin(app);

    meta(app);

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