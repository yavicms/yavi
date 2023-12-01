const http = require("http");
const url = require("url");
const parseRequest = require("../lib/request");
const parseResponse = require("./response");
const parseHandle = require("yavi/server/lib/handle");
const requestOptions = require('./request');

module.exports = function httpServer(info, isdev) {

    function httpHandle(request, response) {

        let { pathname, query } = url.parse(request.url, true);

        parseHandle(
            requestOptions(request, query),
            parseRequest,
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