const { Schema } = require("mongoose");
const design = require("./design");

const schema = new Schema(design, {
    collection: "yavi_users",
    timestamps: true
});

/**
 * Đăng nhập hoặc Lọc người dùng dựa vào { "key": "value" }
 */
schema.index({ "props.v": 1, "props.k": 1 });

/**
 * Tìm theo tên và mô tả
 */
schema.index({ "search.v": "text" });

module.exports = schema;