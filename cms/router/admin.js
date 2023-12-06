module.exports = function (app) {

    app.router(
        "admin",
        "/admin/([a-zA-Z0-9\-]*)",
        (req, res) => res.admin(req.user ? "admin" : "login"));
}