const search = require('./search');
const detail = require('./detail');
const user = require('./user');
const find = require('./find');

module.exports = function (schema, model) {

    /**
     * Tìm kiếm bài viết
     * Đầu vào: $search, $limit, page
     */
    search(schema, model);

    /**
     * Lấy danh sách bài viết của user
     */
    user(schema, model);

    /**
     * 
     */
    find(schema, model);

    /**
     * Lấy bài viết chi tiết
     */
    detail(schema, model);
}