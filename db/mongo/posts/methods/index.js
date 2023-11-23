const search = require('./search');
const detail = require('./detail');

module.exports = function (schema, model) {

    /**
     * Tìm kiếm người dùng
     * Đầu vào: info: { text, limit, page }
     */
    search(schema, model);

    /**
     * Lấy bài viết chi tiết
     */
    detail(schema, model);
}