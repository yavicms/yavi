const HttpResponse = require("yavi/server/lib/response");

module.exports = function (request, response) {

    HttpResponse(request, response);

    let _end = response.end.bind(response);
    let _ended = 0;

    response.end = function (text) {
        if (_ended) return;
        _ended = 1;

        try {
            _end(text);
        }
        catch (e) {
            _end();
        }
    };

    response.json = function (data) {
        response.setHeader("Content-Type", "application/json; charset=utf-8");

        response.data(data);
        response.end(JSON.stringify(response.$data));
    };
}