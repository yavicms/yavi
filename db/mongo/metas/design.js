const { Schema } = require("mongoose");

module.exports = {

    /**
     * 
     */
    parent: Schema.Types.ObjectId,

    /**
     * Type of properties: 
     * - post: tag, category, ...
     * - user: email, phone, ...
     */
    collection: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * type
     */
    type: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Key of properties:
     * - post: ao-thun, quan-bo, ...
     * - user: email, username, phone, ...
     */
    key: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Name of key
     * - post: áo thun, quần bò, ...
     * - user: email, username, số điện thoại, ...
     */
    title: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Mô tả về thẻ (key)
     */
    content: {
        type: String,
        trim: true
    }
};