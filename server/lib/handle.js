const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");
const $notext = "";
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
    ]).then(function () {
        let router = request.router.name;

        if (breakRouter[router]) {
            request.router.controller(request, response, ...request.params);
        }
        else {
            Plugin.run_mw(router, $notext, request, response)
                .then(() => Plugin.run_mw(router, request.method, request, response))
                .then(() => request.router.controller(request, response, ...request.params))
                .catch(errorhandle);
        }
    }).catch(errorhandle);
}