const { Schema } = require("mongoose");
const design = require('./design');

const commentSchema = new Schema(design, {
    collection: "yavi_comments",
    timestamps: true
});

/**
 * Lấy comments bằng post.id và số page trong phân trang
 * Cũng dùng để update comment
 */
commentSchema.index({ post: -1, count: -1 });

module.exports = commentSchema;