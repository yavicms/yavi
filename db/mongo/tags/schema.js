const { Schema, default: mongoose } = require("mongoose");
const schema_design = require("./design");

const tagSchema = new Schema(schema_design, {
    autoIndex: false,
    collection: "yavi_tags",
    timestamps: true
});

/**
 * Lấy tags dựa trên _id
 */
tagSchema.index({ key: 1 });

/**
 * Lấy tags dựa trên thể loại
 */
tagSchema.index({ type: 1 });

/**
 * Tìm tags dựa trên tiêu đề và nội dung
 */
tagSchema.index({
    key: "text",
    title: "text",
    content: "text"
});

module.exports = tagSchema;