module.exports = function (app) {

    app.router("home", "/", (req, res) => res.theme());
}