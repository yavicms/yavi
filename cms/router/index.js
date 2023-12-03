const public = require("./public");
const error = require("./error");
const home = require('./home');
const admin = require('./admin');
const api = require('./api');
const page = require('./page');

module.exports = function (app) {

    /**
     *  Error Page
     */
    error(app);

    /**
     *	Favicon.ico , Public File : css/js/image
     **/
    public(app);

    admin(app);
    api(app);
    page(app);

    home(app);
}