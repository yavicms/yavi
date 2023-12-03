const list = require('yavi/cms/api/user/list');
const detail = require('yavi/cms/api/user/detail');
const add = require('yavi/cms/api/user/add');
const update = require('yavi/cms/api/user/update');
const remove = require('yavi/cms/api/user/remove');
const search = require('yavi/cms/api/user/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/users?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "users", list);

    /**
     * Lấy bài viết chi tiết
     * url: /api/user?{id, field:"user,tags,comments"}
     */
    app.api("get", "user", detail);

    /**
     * Tìm kiếm bài viết:
     * url: /api/user-search?{q}
     */
    app.api("get", "user-search", search);

    /**
     * Tạo bài viết mới
     * url: /api/user-new
     * body: {title,content,user,type}
     */
    app.api("put", "user-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/user-edit
     * body: {id,user,title,content}
     */
    app.api("post", "user-edit", update);

    /**
     * Xóa bài viết
     * url: /api/user-delete
     * body: {id,user}
     */
    app.api("delete", "user-delete", remove);
}