const find = require('yavi/cms/api/comment/find');
const detail = require('yavi/cms/api/comment/detail');
const add = require('yavi/cms/api/comment/add');
const update = require('yavi/cms/api/comment/update');
const remove = require('yavi/cms/api/comment/remove');
const search = require('yavi/cms/api/comment/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/post-list?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "post-list", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/post-search?{q}
     */
    app.api("get", "post-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/post-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "post-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/post-new
     * body: {title,content,user,type}
     */
    app.api("put", "post-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/post-edit
     * body: {id,user,title,content}
     */
    app.api("post", "post-edit", update);

    /**
     * Xóa bài viết
     * url: /api/post-delete
     * body: {id,user}
     */
    app.api("delete", "post-delete", remove);
}