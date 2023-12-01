const public = require("./public");
const error = require("./error");
const home = require('./home');
const admin = require('./admin');
const api = require('./api');
const page = require('./page');

module.exports = function (app) {

    home(app);
    admin(app);
    api(app);
    page(app);

    /**
     *  Error Page
     */
    error(app);

    /**
     *	Favicon.ico , Public File : css/js/image
     **/
    public(app);
}