const account = require('./account');
const admin = require('./admin');
const api = require('./api');
const tag = require('./tag');
const search = require('./search');
const user = require('./user');

const public = require("./public");
const error = require("./error");
const home = require('./home');

const routes = [
    ["admin", "/admin/([a-z0-9\-]*)"],
    ["api", "/api/([a-z0-9\-]*)"],
    ["account", "/account/([a-z\-]{0,20})"],
    ["search", "/search/(a-z0-9\-]+)"],
    ["tag", "/tag/(a-zA-Z0-9\_]+)"],
    ["category", "/category/([a-zA-Z0-9\-]+)"],
    ["video", "/video/([a-zA-Z0-9\-]+)"],
    ["photo", "/photo/([a-zA-Z0-9\-]+)"],
    ["user", "/@([a-zA-Z0-9\.]+)"],
    ["post", "/([a-zA-Z0-9\-]+)"]
];

module.exports = function (app) {

    /**
     *  Error Page
     */
    error(app);

    /**
     * Home
     */
    home(app);

    /**
     *	Favicon.ico , Public File : css/js/image
     **/
    public(app);

    /**
     * Admin
     */
    admin(app);

    /**
     * Api
     */
    api(app);

    /**
     * Account
     */
    account(app);

    /**
     * Tags
     */
    tag(app);

    /**
     * Search
     */
    search(app);

    /**
     * User
     */
    user(app);

    /**
     * Register Router (use for ajax/socket: PUT/POST/DELETE)
     */
    function controller(req, res) {
        app.get_content_page(req)
            .then((data) => res.success(data))
            .catch((error) => res.error(error));
    }
    routes.forEach((r) => app.router(r[0], r[1], controller));
}