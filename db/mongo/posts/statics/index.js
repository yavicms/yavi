const search = require('./search');
const detail = require('./detail');
const user = require('./user');
const find = require('./find');
const create = require('./new');

module.exports = function (Post) {

    /**
     * Tìm kiếm bài viết
     * Đầu vào: $search, $limit, page
     */
    search(Post);

    /**
     * Lấy danh sách bài viết của user
     */
    user(Post);

    /**
     * 
     */
    find(Post);

    /**
     * Lấy bài viết chi tiết
     */
    detail(Post);

    /**
     * Tạo bài viết mới
     */
    create(Post);
}