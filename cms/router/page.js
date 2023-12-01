const list = [

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
    ["account", "/account/(a-z\-]+)"],
    ["user", "/@([a-zA-Z0-9\.]+)"],
    ["video", "/video/([a-zA-Z0-9\-]+)"],
    ["photo", "/photo/([a-zA-Z0-9\-]+)"],
    ["category", "/category/([a-zA-Z0-9\-]+)"],
    ["post", "/([a-zA-Z0-9\-]+)"]
];

function controller(req, res) {
    return res.theme();
};

module.exports = function (app) {

    list.forEach((r) => app.router(r[0], r[1], controller));
}