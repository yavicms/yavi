
module.exports = function (app) {

    app.get("search", function (req, res) {
        app.get_content_page(req)
            .then((data) => res.theme("search", data))
            .then(() => res.theme("search", app.get("error.search")));
    });
}