const cookieParser = require('cookie-parser');
const bodyParser = require('./body-parser');

module.exports = function (app) {

    /**
     * body-parser
     */
    app.use(bodyParser);

    /**
     * cookie-parser
     */
    app.use(cookieParser());
}