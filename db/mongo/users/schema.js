const { Schema } = require("mongoose");
const schemaDesign = require("./design");

const userSchema = new Schema(schemaDesign, {
    collection: "yavi_users",
    timestamps: true
});

/**
 * Đăng nhập hoặc Lọc người dùng dựa vào { "key": "value" }
 */
userSchema.index({ "login.v": 1, "login.k": 1 });

/**
 * Tìm theo tên và mô tả
 */
userSchema.index({
    "username": "text",
    "fullname": "text",
    "content": "text"
});

/**
 * Lấy danh sách những người đăng kí mới
 */
userSchema.index({ "created": 1 });

module.exports = userSchema;