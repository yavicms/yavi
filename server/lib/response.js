const View = require("yavi/server/lib/view");
const Plugin = require("yavi/plugin");

module.exports = function HttpResponse(request, response) {

    function render(dir, viewfile, data) {
        (new View(dir, request))
            .view(viewfile, data)
            .then(text => response.end(text))
            .catch(err => response.end());
    };

    response.$data = {
        data: {}
    };

    response.data = function (...array) {
        switch (array.length) {
            case 1:
                if (typeof array[0] === "object") {
                    Object.assign(response.$data.data, array[0]);
                }
                break;

            case 2:
                if (typeof array[0] === "string" && array[1] !== undefined) {
                    response.$data.data[array[0]] = response.$data.data[array[1]];
                }
                break;
        }
    };

    response.success = function (data) {
        response.$data.type = "success";
        response.json(data);
    };

    response.error = function (error) {
        switch (typeof error) {
            case "object":
                response.$data.name = error.name;
                response.$data.message = error.message;
                break;
            case "string":
                response.$data.message = error;
                break;
        }
        response.$data.type = "error";
        response.json();
    };

    response.html = function (viewfile, data) {
        render(request.router.dir, viewfile || "main", data);
    };

    response.theme = function (viewfile, data) {
        render(Plugin.themedir, viewfile || request.router.name, data);
    };

    response.admin = function (viewfile, data) {
        render(Plugin.admindir, viewfile || "main", data);
    };

}