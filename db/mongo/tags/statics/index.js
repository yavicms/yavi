const search = require('./search');
const type = require('./type');
const add = require('./user-new');

module.exports = function (model) {

    /**
     * Tìm tags bằng chức năng tìm kiếm văn bản:
     * - _id, title, content
     */
    search(model);

    /**
     * Lấy danh sách các danh mục dựa trên thể loại:
     * - type: tag, category, ...
     */
    type(model);

    add(model);
}