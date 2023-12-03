const { Schema } = require("mongoose");
const fileSchema = require("../files/schema");

module.exports = {
    /**
     * ObjectId của bài viết cha
     */
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },

    /**
     * Tiêu đề bài viết
     */
    title: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Slug: là đường dẫn của post, được custom từ title;
     * title: Đây là bài viết 1
     * slug:  day-la-bai-viet-1
     */
    slug: {
        type: String,
        trim: true
    },

    /**
     * Nội dung bài viết
     */
    content: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Type:
     * post, page, product, ...
     */
    type: {
        type: String,
        default: "post"
    },

    /**
     * Thông tin người đăng bài
     */
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    /**
     * Mảng chứa thông tin về các files
     */
    files: [fileSchema],

    /**
     * Ảnh đại diện của bài viết
     */
    thumb: {
        type: String
    },

    /**
     * Dữ liệu có thể mở rộng:
     * 
     * Tags:
     * - k: tag
     * - v: tag1, tag2
     * 
     * Categoty
     * - k: category
     * 
     * Date
     * - k: date
     */
    props: [
        {
            k: { type: String, required: true },
            v: { type: Schema.Types.Mixed, required: true }
        }
    ],

    /**
     * Đánh giá của bài viết
     */
    rating: {
        type: [Number],
        default: [0, 0, 0, 0, 0]
    },

    comment_status: {
        type: String,
        trim: true,
        enum: ["open", "close"],
        default: "open"
    },

    password: {
        type: String,
        trim: true
    }
};