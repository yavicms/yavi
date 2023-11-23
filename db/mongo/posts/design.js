const { Schema } = require("mongoose");

module.exports = {
    /**
     * ObjectId của bài viết cha
     */
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null
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
     * Nội dung bài viết
     */
    content: {
        type: String,
        required: true,
        trim: true
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
     * Mảng chứa ObjectId của các tags
     */
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],

    /**
     * Mảng chứa thông tin về các files
     */
    files: [
        {
            id: { type: String, required: true },
            type: { type: String, required: true },
            src: { type: String, required: true },
            thumb: { type: String }
        }
    ],

    /**
     * Số lượng files hoặc sản phẩm
     */
    quantity: {
        type: Number,
        default: 0
    },

    /**
     * Ảnh đại diện của bài viết
     */
    thumb: {
        type: String
    },

    /**
     * Dữ liệu có thể mở rộng
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
        "1": { type: Number, default: 0 },
        "2": { type: Number, default: 0 },
        "3": { type: Number, default: 0 },
        "4": { type: Number, default: 0 },
        "5": { type: Number, default: 0 },
        average: { type: Number, default: 0 }
    },

    /**
     * Ngày tạo bài viết
     */
    created: { type: Date, default: Date.now }
};