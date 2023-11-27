const search = require('./get/search');
const detail = require('./get/detail');
const user = require('./get/user');
const find = require('./get/find');
const create = require('./put/new');

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