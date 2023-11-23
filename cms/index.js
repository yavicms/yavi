const PublicRouter = require("./router/public");
const Data = require("./data");
const Socket = require("./socket");

module.exports = function (app) {

    app.dir = __dirname;

    /**
     * 	Home Page
     **/
    app.router("home", "/", require("./router/home"));

    /**
     *  Admin Page
     */
    app.router("admin", "/admin/([a-zA-Z0-9\-]*)", require("./router/admin"));

    /**
     *  Router for Socket Post
     */
    app.router("_socket_", "/socket/([a-zA-Z0-9\-]+)/([a-zA-Z0-9\-]+)", require("./router/socket"));


    /**
     *	Favicon.ico , Public File : css/js/image
     **/
    PublicRouter(app);

    /**
     * 	/post/1
     **/
    app.router("tag", "/tag/(a-zA-Z0-9\_]+)", require("./router/page"));
    app.router("search", "/search/(a-zA-Z0-9\-\_\s]+)", require("./router/page"));
    app.router("account", "/account/(a-z\-]+)", require("./router/page"));
    app.router("user", "/u/([a-zA-Z0-9\.]+)", require("./router/page"));
    app.router("video", "/video/([a-zA-Z0-9\-]+)", require("./router/page"));
    app.router("photo", "/photo/([a-zA-Z0-9\-]+)", require("./router/page"));
    app.router("category", "/category/([a-zA-Z0-9\-]+)", require("./router/page"));
    app.router("post", "/([a-zA-Z0-9\-]+)", require("./router/page"));

    //app.router("page", "/(tag|search|post|video|photo|user|account)/([a-zA-Z0-9\-\_]+)", require("./request/posts"));

    /**
     *  Error Page
     */
    app.error(require("./router/error"));

    Data(app);
    Socket(app);

};