module.exports = function (request, response) {
    request.method === "get" ? response.theme() : response.json();
};