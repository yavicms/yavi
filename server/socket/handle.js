const App = require("yavi/plugin");

const parseRequest = require("../lib/request");
const parseResponse = require("./response");
const parseHandle = require("yavi/server/lib/handle");
const requestOptions = require("./request");

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

        parseHandle(
            requestOptions(request, options),
            parseRequest,
            parseResponse,
            request,        // request
            socket,         // response
            options.path    // pathname
        );
    });
}
