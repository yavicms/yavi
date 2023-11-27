const App = require("yavi/plugin");

const parseRequest = require("../lib/request");
const parseResponse = require("./response");
const parseHandle = require("yavi/server/lib/handle");

const notmatch = new RegExp("^/(public|favicon)");

module.exports = function socketHandle(socket) {

    /**
     *   request :
     *   {
     *       method: 'post',
     *       path: '/post/1',
     *       body: { name: 'Thuan' },
     *       query: { id: '1' },
     *       type: 'json'
     *   }
     */
    socket.on("http.request", function (options) {

        if (notmatch.test(options.path)) return;

        let request = socket.request;

        request.body = options.body;
        request.method = options.method;
        request.type = options.type;
        request.issocket = 1;

        parseHandle(
            parseRequest(request, options.query),
            parseResponse,
            request,        // request
            socket,         // response
            options.path,   // pathname
            function (e) {
                if (e && App.info.dev) console.log(e);
            });
    });
}
