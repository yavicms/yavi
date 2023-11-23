const Yavi = require("yavi");
// const Hook = require("./router/hook");
/**
 * Trước tiên cần khởi tạo Plugin với giá trị bắt buộc là __dirname.
 */
const app = module.exports = new Yavi(__dirname);

/**
 *  Đăng kí router cho trang bất kì,
 *  tuy nhiên cần phải đúng với các router_name đã được định sẵn ,
 *  để đồng bộ với các dữ liệu chung của website .
 *  Các router_name chính: home, admin, search, post, ...
 *  
 *  Hoặc nếu bạn muốn tạo mới dữ liệu của riêng bạn,
 *  thì bạn có thể tự định nghĩa router_name riêng của bạn .
 *  Ví dụ: friend, video, ...
 */
app.router("home", "/", (request, response) => response.html());

// app.router("search", "/search/([a-zA-Z0-9\-]*)", require("./router"));

/**
 *  Đăng kí hook cho bố cục trong View HTML
 */
// Hook(app);

app.hook("content", function (request) {

    return ["<p>time: ", Date.now(), "</p>"].join("");

});