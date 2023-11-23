module.exports = function (hook, app) {

    hook("admin:head", function (request) {
        return app.view("hook/head", request);
    });

    hook("admin:footer", function (request) {
        return app.view("hook/footer", request);
    });

    hook("admin:sidebar", function (req) {
        return app.view("hook/sidebar", req);
    });

    hook("admin:main", function (req) {
        return app.view("page." + (req.params[0] || "home"), req);
    });

}