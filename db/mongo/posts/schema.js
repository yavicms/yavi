const { Schema } = require("mongoose");
const design = require('./design');

const postSchema = new Schema(design, {
    collection: "yavi_posts",
    timestamps: true
});

/**
 * Index để tìm kiếm theo người đăng
 */
postSchema.index({ user: 1 });

/**
 * Đánh chỉ mục cho trường props.k và props.v,
 * trong đó "props.v" sắp xếp theo thứ tự giảm dần
 * 
 * Cái này dùng để:
 * - lấy bài viết yêu thích nhất : { k: "rate" }
 * - lấy bài viết xem nhiều nhất : { k: "view" }
 * - lấy bài viết mới cập nhật   : { k: "updated" }
 * - ...
 */
postSchema.index({ "props.k": 1, "props.v": -1 });

/**
 * Tìm kiếm bài viết dựa trên: tiêu đề, nội dung.
 */
postSchema.index({
    title: "text",
    description: "text"
});

module.exports = postSchema;
