const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");

module.exports = function (
    parseRequest,
    parseResponse,
    request,
    response,
    pathname,
    errorhandle
) {
    Promise.all([
        Plugin.checkRouter(request, pathname),
        parseRequest,
        parseResponse(request, response),
        View.reset()
    ]).then(function () {
        Plugin.run_mw(request.router.name, "", request, response)
            .then(() => Plugin.run_mw(request.router.name, request.method, request, response))
            .then(() => request.yavi_controller(request, response, ...request.params))
            .catch(errorhandle);
    }).catch(errorhandle);
}