const { Schema } = require("mongoose");
const itemDesign = require("./design-item");
const itemSchema = new Schema(itemDesign);

module.exports = {

    /**
     * Post.ID
     */
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },

    /**
     * 
     */
    count: {
        type: Number,
        default: 1
    },

    /**
     * 
     */
    comments: [itemSchema]
};