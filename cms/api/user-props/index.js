const find = require('./find');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/user-props?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "user-props", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/user-props-search?{q}
     */
    app.api("get", "user-props-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/user-props-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "user-props-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/user-props-new
     * body: {title,content,user,type}
     */
    app.api("put", "user-props-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/user-props-edit
     * body: {id,user,title,content}
     */
    app.api("post", "user-props-edit", update);

    /**
     * Xóa bài viết
     * url: /api/user-props-delete
     * body: {id,user}
     */
    app.api("delete", "user-props-delete", remove);
}