
module.exports = function (app) {

    app.error(function (req, res) {

        req.x_yavi_type === "json"
            ? res.error("page_not_found")
            : res.html("error", app.get_data("error"));
    });
}