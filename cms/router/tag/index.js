

module.exports = function (app) {

    app.get("tag", function (req, res) {
        app.get_content("get.tag.", req)
            .then((data) => res.html("tag", data))
            .catch(() => res.html("tag", app.get_data("error.tag")));
    });
}