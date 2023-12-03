const find = require('./find');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/props-user?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "props-user", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/props-user-search?{q}
     */
    app.api("get", "props-user-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/props-user-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "props-user-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/props-user-new
     * body: {title,content,user,type}
     */
    app.api("put", "props-user-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/props-user-edit
     * body: {id,user,title,content}
     */
    app.api("post", "props-user-edit", update);

    /**
     * Xóa bài viết
     * url: /api/props-user-delete
     * body: {id,user}
     */
    app.api("delete", "props-user-delete", remove);
}