module.exports = function (request, response) {
    request.method === "get" ? response.admin("admin") : response.json();
};