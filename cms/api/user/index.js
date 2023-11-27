const list = require('yavi/cms/api/user/list');
const detail = require('yavi/cms/api/user/detail');
const add = require('yavi/cms/api/user/add');
const update = require('yavi/cms/api/user/update');
const remove = require('yavi/cms/api/user/remove');
const search = require('yavi/cms/api/user/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/user-list?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "user-list", list);

    /**
     * Tìm kiếm bài viết:
     * url: /api/user-search?{q}
     */
    app.api("get", "user-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/user-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "user-detail", detail);

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
    app.api("user", "user-edit", update);

    /**
     * Xóa bài viết
     * url: /api/user-delete
     * body: {id,user}
     */
    app.api("delete", "user-delete", remove);
}