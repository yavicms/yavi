
module.exports = function (app) {
    app.error(function (req, res) {
        return req.isajax
            ? res.error()
            : res.theme("error");
    });
}