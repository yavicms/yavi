const mongoose = require("mongoose");
const App = require("yavi/plugin");
const { qs } = require("yavi/lib");

module.exports = function Mongoose(options) {

    let $uri = options.uri || `mongodb://${options.host}:${options.port}/${options.database}`;

    $uri += qs.string(options.query);

    function EmitDatabase($status) {
        App.log("MongoDB", __filename, { $status, $uri });
    };

    function ErrorDatabase($error) {
        App.error("MongoDB", __filename, $error, { $uri });
    };

    try {
        mongoose.connect($uri, options.options);

        // Bắt sự kiện khi kết nối thành công
        mongoose.connection.on("connected", () => EmitDatabase("connected"));

        // Bắt sự kiện khi có lỗi kết nối
        mongoose.connection.on("error", error => ErrorDatabase(error));

        // Bắt sự kiện khi đóng kết nối
        mongoose.connection.on("disconnected", () => EmitDatabase("disconnected"));

    } catch (error) {
        ErrorDatabase(error);
    }
}
