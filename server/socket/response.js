const Response = require("yavi/server/lib/response");
const isFn = 1;

module.exports = function (request, response) {

    Response(request, response);

    let _ended = 0;

    response.end = response.write = response.send = function (text) {
        if (_ended) return _ended = 0;
        _ended = 1;
        response.emit("http.request", text, isFn);
    };

    response.json = function (data) {
        response.data(data);
        response.end(response.$data);
    };

    response.setHeader = function () { };
    response.writeHead = function () { };
}