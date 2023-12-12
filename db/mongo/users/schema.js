const { Schema } = require("mongoose");
const design = require("./design");

const schema = new Schema(design, {
    collection: "yavi_users",
    timestamps: true
});

/**
 * Đăng nhập:
 * User.findOne({ "login": "value" })
 */
schema.index({ "login.v": 1 });

/**
 * Lọc người dùng dựa vào { "key": "value" }
 */
schema.index({ "props.k": -1, "props.v": -1 });

/**
 * Tìm theo tên và mô tả
 */
schema.index({ "search.v": "text" });

module.exports = schema;