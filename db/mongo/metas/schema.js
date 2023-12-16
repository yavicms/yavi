const { Schema } = require("mongoose");
const design = require('./design');

const metaSchema = new Schema(design, {
    collection: "yavi_metas",
    timestamps: true
});

/**
 * Lấy danh sách Meta theo Collection: users, posts
 */
metaSchema.index({ key: 1 });

module.exports = metaSchema;