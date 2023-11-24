const { Schema } = require("mongoose");
const fileSchema = require("../files/schema");

module.exports = {

    _id: { type: Schema.Types.ObjectId, auto: true },

    content: { type: String, required: true, trim: true },

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    files: [fileSchema],

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
};
