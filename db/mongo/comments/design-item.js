const { Schema } = require("mongoose");
const fileSchema = require("../files/schema");

module.exports = {
    content: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    files: [fileSchema]
};
