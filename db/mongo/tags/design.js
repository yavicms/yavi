const { Schema } = require("mongoose");

module.exports = {

    /**
     *  Key
     */
    key: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    /**
     * 
     */
    parent: {
        type: String,
        trim: true
    },

    /**
     * Type: 
     * - thẻ:           tag, 
     * - danh mục:      category,
     * - quốc gia:      country, 
     * - năm sản xuất:  time
     */
    type: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Tiêu đề thẻ
     */
    title: {
        type: String,
        trim: true
    },

    /**
     * Mô tả / nội dung của thể
     */
    content: {
        type: String,
        trim: true
    },

    /**
     * Các giá trị thêm
     */
    props: [
        {
            k: { type: String },
            v: { type: Schema.Types.Mixed }
        }
    ]
};