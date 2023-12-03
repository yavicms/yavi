const find = require('./find');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/props-post?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "props-post", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/props-post-search?{q}
     */
    app.api("get", "props-post-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/props-post-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "props-post-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/props-post-new
     * body: {title,content,user,type}
     */
    app.api("put", "props-post-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/props-post-edit
     * body: {id,user,title,content}
     */
    app.api("post", "props-post-edit", update);

    /**
     * Xóa bài viết
     * url: /api/props-post-delete
     * body: {id,user}
     */
    app.api("delete", "props-post-delete", remove);
}