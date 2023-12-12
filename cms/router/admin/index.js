const checkToken = require("yavi/cms/mw/check-token");

module.exports = function (app) {

    app.use("admin", checkToken(function (req, res) {
        if (req.x_yavi_type === "json") {
            res.end();
        }
        else {
            app.get_content("get.admin.login", req)
                .then((data) => res.html("login", data))
                .catch(() => res.end());
        }
    }));

    app.get("admin", function (req, res) {
        app.get_content_page(req)
            .then((data) => res.html("admin", data))
            .catch(async () => res.html("admin", await app.data("error.admin", req)));
    });
}