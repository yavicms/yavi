const Response = require("yavi/server/lib/response");
const isFn = 1;

module.exports = function (request, response) {

    Response(request, response);

    let _ended = 0;

    response.end = response.write = response.send = function (text) {
        if (_ended) {
            _ended = 0;
            return;
        };
        response.emit("http.request", text, isFn);
        _ended = 1;
    };

    response.json = function (data) {
        if (data) response.data(data);
        response.end(response.$data);
    };

    response.status = function (code, message) {

        if (code) response.$data.status.code = code;
        if (message) response.$data.status.message = message;

        return response;
    };

    response.setHeader = function () { };
    response.writeHead = function () { };
}