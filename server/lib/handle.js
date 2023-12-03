const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");
const breakRouter = {
    "_0_favicon": 1,
    "_1_public": 1,
    "_2_public": 1,
    "_3_public": 1
};

module.exports = function (
    requestOptions,
    parseRequest,
    parseResponse,
    request,
    response,
    pathname,
    errorhandle
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
                ? request.router.controller(request, response, ...request.params)
                : Plugin.run_mw(router, request.method, request, response);
        })
        .catch(errorhandle);
}