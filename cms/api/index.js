const MW = require('./middleware');
const user = require('./user');
const tag = require('./tag');
const post = require('./post');
const comment = require('./comment');
const plugin = require('./plugin');

module.exports = function (app) {

    /**
     * Set Middleware for router "api"
     */
    MW(app);

    /**
     * API cho ( plugin/theme/admin )
     */
    plugin(app);

    /**
     *  API cho ( users )
     */
    user(app);

    /**
     *  API cho ( tags )
     */
    tag(app);

    /**
     *  API cho ( posts )
     */
    post(app);

    /**
     *  API cho ( comments )
     */
    comment(app);
}