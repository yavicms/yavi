module.exports = function (request, response) {
    request.isajax
        ? response.status(404, "Page not found").json()
        : response.theme("error");
}