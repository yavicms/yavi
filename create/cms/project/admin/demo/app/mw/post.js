
module.exports = function (post, app) {
    post("admin", function (request, response, next) {
        response.json(request.body);
        console.log(request.issocket, request.body);
        console.log("post");
    });
}