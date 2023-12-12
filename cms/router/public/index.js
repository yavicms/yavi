
module.exports = function PublicRouter(app) {

    /**
     *	Favicon . ico
     **/
    app.router("0:public", "/favicon.ico", require("./favicon"));

    app.router("1:public", "/public/(.+)", require("./public"));

    app.router("2:public", "/lang/([a-z]{2,3})", require("./lang"));
}