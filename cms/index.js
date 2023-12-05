const data = require("./data");
const api = require("./api");
const routes = require('./router');
const hook = require("./app/hook");

module.exports = function (app) {

    app.dir = __dirname;

    routes(app);

    data(app);

    api(app);

    hook(app);
};
