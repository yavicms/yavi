const Yavi = require("yavi");
const app = module.exports = new Yavi(__dirname);

const Hook = require("./app/hook");
const Data = require("./app/data");

const CheckLogin = require("./app/mw/check-login");
const MethodGet = require("./app/mw/get");
const MethodPost = require("./app/mw/post");

const SocketRouter = require("./app/mw/socket");

/**
 * Phải login trước khi vào trang admin
 */
// CheckLogin(app.use.bind(app), app);

/**
 *  
 */
MethodGet(app.get.bind(app), app);

/**
 * 
 */
// MethodPost(app.post.bind(app), app);

/**
 * Socket Router
 */
SocketRouter(app.socket.bind(app), app);

/**
 * 
 */
Data(app.data.bind(app), app);

/**
 * 
 */
Hook(app.hook.bind(app), app);
