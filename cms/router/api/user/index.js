const list = require('yavi/cms/router/api/user/list');
const detail = require('yavi/cms/router/api/user/detail');
const add = require('yavi/cms/router/api/user/add');
const update = require('yavi/cms/router/api/user/update');
const remove = require('yavi/cms/router/api/user/remove');
const search = require('yavi/cms/router/api/user/search');

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