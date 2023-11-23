module.exports = function (request, response) {
    request.method !== "get" ? response.end() : response.theme();
}