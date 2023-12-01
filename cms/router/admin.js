module.exports = function (app) {

    app.router("admin", "/admin/([a-zA-Z0-9\-]*)", (req, res) =>
        res.html(req.user ? "admin" : "login"));
}