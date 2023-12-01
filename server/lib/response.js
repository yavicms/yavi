const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");

module.exports = function HttpResponse(request, response) {

    function render(dir, viewfile) {
        (new View(dir, request))
            .view(viewfile)
            .then(text => response.end(text))
            .catch(err => response.end());
    };

    response.$data = {
        status: {
            code: 200,
            message: "OK"
        },
        data: {}
    };

    response.error = function (error) {
        response.$data.status.code = 500;
        response.$data.status.error = error.name;
        response.$data.status.message = error.message;
        return response;
    };

    response.html = function (viewfile) {
        render(request.router.dir, viewfile || "main");
    };

    response.theme = function (viewfile) {
        render(Plugin.themedir, viewfile || request.router.name);
    };

    response.admin = function (viewfile) {
        render(Plugin.admindir, viewfile || "main");
    };

    response.data = function (options, value) {
        switch (typeof options) {
            case "object":
                Object.assign(response.$data.data, options);
                break;
            case "string":
                if (value !== undefined) response.$data.data[options] = value;
                else return response.$data.data[options];
                break;
        }
        return response;
    };

}