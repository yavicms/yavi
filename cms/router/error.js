
module.exports = function (app) {
    app.error(function (req, res) {
        return req.isajax
            ? res.status(404, "page-not-found").json()
            : res.theme("error");
    });
}