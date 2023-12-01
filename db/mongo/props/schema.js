const { Schema } = require("mongoose");
const design = require("./design");

module.exports = function (collection) {

    const schema = new Schema(design, {
        collection,
        timestamps: true
    });

    /**
     * lấy danh sách dựa vào Type
     */
    schema.index({ type: 1 });

    /**
    * Tìm : key, name
    */
    schema.index({ key: "text", name: "text" });

    return schema;
}