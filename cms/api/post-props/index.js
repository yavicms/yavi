const find = require('./find');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/post-props?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "post-props", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/post-props-search?{q}
     */
    app.api("get", "post-props-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/post-props-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "post-props-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/post-props-new
     * body: {title,content,user,type}
     */
    app.api("put", "post-props-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/post-props-edit
     * body: {id,user,title,content}
     */
    app.api("post", "post-props-edit", update);

    /**
     * Xóa bài viết
     * url: /api/post-props-delete
     * body: {id,user}
     */
    app.api("delete", "post-props-delete", remove);
}