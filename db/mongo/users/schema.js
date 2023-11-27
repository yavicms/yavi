const { Schema } = require("mongoose");
const design = require("./design");

const schema = new Schema(design, {
    collection: "yavi_users",
    timestamps: true
});

/**
 * Đăng nhập hoặc Lọc người dùng dựa vào { "key": "value" }
 */
schema.index({ "login.v": 1, "login.k": 1 });

/**
 * Tìm theo tên và mô tả
 */
schema.index({
    "username": "text",
    "fullname": "text",
    "content": "text"
});

/**
 * Lấy danh sách những người đăng kí mới
 */
schema.index({ "created": 1 });

module.exports = schema;