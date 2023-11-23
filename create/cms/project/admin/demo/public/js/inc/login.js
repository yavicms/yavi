const {
  socket
} = require("./socket");
$("#loginForm").on("submit", function (e) {
  e.preventDefault();
  socket.post("/admin/login", {
    username: this.username.value,
    password: this.password.value
  }, function (data) {
    // Xử lý dữ liệu JSON nhận được
    console.log("Server-Response:", data);
  });
});