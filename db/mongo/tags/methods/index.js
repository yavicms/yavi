const search = require('./search');
const type = require('./type');

module.exports = function (schema, model) {

    /**
     * Tìm tags bằng chức năng tìm kiếm văn bản gợi ý:
     * - _id, title, content
     */
    search(schema, model);

    /**
     * Lấy danh sách các danh mục dựa trên thể loại:
     * - type: tag, category, ...
     */
    type(schema, model);

}