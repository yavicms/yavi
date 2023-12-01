const Data = require("./data");
const Api = require("./api");
const routes = require('./router');

module.exports = function (app) {

    app.dir = __dirname;

    routes(app);

    Data(app);
    Api(app);
};
