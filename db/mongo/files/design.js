const { Schema } = require("mongoose");

module.exports = {

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },

    /**
     * Loại file: image, video, ...
     */
    type: { type: String },

    /**
     * Tiêu đề của file
     */
    title: { type: String, trim: true },

    /**
     * Link files
     */
    src: { type: String, required: true, trim: true },

    /**
     * Ảnh đại diện
     */
    thumb: { type: String, trim: true },

    /**
     * Thời gian tạo
     */
    created: { type: Date, default: Date.now }
};