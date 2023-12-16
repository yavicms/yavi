const { Schema } = require("mongoose");

/**
 * Định nghĩa các tùy chọn cho website
 * {key: "collection", value: ["yavi_posts", "yavi_users"]}
 * {key: "meta_type", value: ["tag", "category", ...]}
 */
module.exports = {

    key: {
        type: String,
        trim: true,
        required: true
    },

    value: {
        type: Schema.Types.Mixed,
        required: true
    },

    content: String
};