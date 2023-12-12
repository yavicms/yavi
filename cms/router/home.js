module.exports = function (app) {

    app.router("home", "/", (req, res) => res.end());

    app.get("home", function (req, res) {
        app.get_content("get.home.", req)
            .then((data) => res.html("home", data))
            .catch(() => res.html("home", app.get_data("error.home")));
    });
}