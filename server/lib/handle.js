const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");
const breakRouter = {
    "0:public": 1,
    "1:public": 1,
    "2:public": 1
};

module.exports = function (
    requestOptions,
    parseRequest,
    parseResponse,
    request,
    response,
    pathname
) {
    Promise.all([
        Plugin.checkRouter(request, pathname),
        requestOptions,
        parseRequest(request),
        parseResponse(request, response),
        View.reset()
    ])
        .then(function () {

            let router = request.router.name;

            return breakRouter[router]
                ? request.router.controller(request, response)
                : Plugin.run_mw(router, request.method, request, response);
        })
        .catch(function (error) {
            if (request.x_yavi_type === "json") {
                response.error(error);
            } else {
                response.theme("error");
            }
        });
}