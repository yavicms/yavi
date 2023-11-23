
module.exports = function (get, app) {
    app.get("admin", function (request, response, next) {
        // if (request.User) response.admin("main");
        // else response.admin("login");

        return response.admin("main");
    });
}