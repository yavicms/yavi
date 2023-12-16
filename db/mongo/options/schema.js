const { Schema } = require("mongoose");
const design = require('./design');

const optionSchema = new Schema(design, {
    collection: "yavi_options",
    timestamps: true
});

/**
 * Lấy danh sách option theo Collection: users, posts
 */
optionSchema.index({ key: 1 });

module.exports = optionSchema;