const find = require('yavi/cms/api/tag/find');
const detail = require('yavi/cms/api/tag/detail');
const add = require('yavi/cms/api/tag/add');
const update = require('yavi/cms/api/tag/update');
const remove = require('yavi/cms/api/tag/remove');
const search = require('yavi/cms/api/tag/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/tag-list?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "tag-list", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/tag-search?{q}
     */
    app.api("get", "tag-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/tag-detail?{id, field:"user,tags,comments"}
     */
    app.api("get", "tag-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/tag-new
     * body: {title,content,user,type}
     */
    app.api("put", "tag-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/tag-edit
     * body: {id,user,title,content}
     */
    app.api("tag", "tag-edit", update);

    /**
     * Xóa bài viết
     * url: /api/tag-delete
     * body: {id,user}
     */
    app.api("delete", "tag-delete", remove);
}