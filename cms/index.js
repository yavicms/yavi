const data = require("./data");
const routes = require('./router');
const mw = require('./mw');

module.exports = function (app) {

    app.dir = __dirname;

    routes(app);

    data(app);

    mw(app);
};
