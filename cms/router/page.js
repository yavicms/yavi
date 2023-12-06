const list = [

    /**
     * api
     */
    ["api", "/api/([a-z0-9\-]+)"],

    /**
     * Tags
     */
    ["tag", "/tag/(a-zA-Z0-9\_]+)"],

    /**
     * Search
     */
    ["search", "/search/(a-zA-Z0-9\-\_\s]+)"],

    /**
     * Account
     */
    ["account", "/account/([a-z\-]+)"],
    ["user", "/@([a-zA-Z0-9\.]+)"],
    ["video", "/video/([a-zA-Z0-9\-]+)"],
    ["photo", "/photo/([a-zA-Z0-9\-]+)"],
    ["category", "/category/([a-zA-Z0-9\-]+)"],
    ["post", "/([a-zA-Z0-9\-]+)"]
];

const account = require('./account');
const api = require('./api');

module.exports = function (app) {

    function controller(req, res) {

        if (req.x_yavi_type === "json") {
            app.get_content_page(req)
                .then((data) => res.success(data))
                .catch((error) => res.error(error));
        }
        else {
            app.get_content_page(req)
                .then((main_content) => res.theme(req.router.name, { main_content }))
                .catch(() => res.theme("error"));
        }
    }

    list.forEach(function (r) {

        app.router(r[0], r[1], controller);

    });

    account(app);
    api(app);
}