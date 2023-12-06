const list = require('./list');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/users?{limit,page,field:"user,tags,comments"}
     */
    app.content("get.api.users", list);

    /**
     * Lấy bài viết chi tiết
     * url: /api/user?{id, field:"user,tags,comments"}
     */
    app.content("get.api.user", detail);

    /**
     * Tìm kiếm bài viết:
     * url: /api/user-search?{q}
     */
    app.content("get.api.user-search", search);

    /**
     * Tạo bài viết mới
     * url: /api/user-new
     * body: {title,content,user,type}
     */
    app.content("put.api.user-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/user-edit
     * body: {id,user,title,content}
     */
    app.content("post.api.user-edit", update);

    /**
     * Xóa bài viết
     * url: /api/user-delete
     * body: {id,user}
     */
    app.content("delete.api.user-delete", remove);
}