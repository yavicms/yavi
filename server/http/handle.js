const http = require("http");
const url = require("url");
const parseRequest = require("../lib/request");
const parseResponse = require("./response");
const parseHandle = require("yavi/server/lib/handle");

module.exports = function httpServer(info, isdev) {

    function httpHandle(request, response) {

        let { pathname, query } = url.parse(request.url, true);

        parseHandle(
            parseRequest(request, query),
            parseResponse,
            request,
            response,
            pathname,
            query,
            function (e) {
                response.end();
                if (isdev) console.log(e);
            }
        );
    }

    return http.createServer(httpHandle).listen(info.port);
}