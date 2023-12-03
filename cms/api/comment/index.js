const find = require('yavi/cms/api/comment/find');
const detail = require('yavi/cms/api/comment/detail');
const add = require('yavi/cms/api/comment/add');
const update = require('yavi/cms/api/comment/update');
const remove = require('yavi/cms/api/comment/remove');
const search = require('yavi/cms/api/comment/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/comments?{limit,page,field:"user,tags,comments"}
     */
    app.api("get", "comments", find);

    /**
     * Lấy bài viết chi tiết
     * url: /api/comment?{id, field:"user,tags,comments"}
     */
    app.api("get", "comment", detail);

    /**
     * Tìm kiếm bài viết:
     * url: /api/comment-search?{q}
     */
    app.api("get", "comment-search", search);

    /**
     * Tạo bài viết mới
     * url: /api/comment-new
     * body: {title,content,user,type}
     */
    app.api("put", "comment-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/comment-edit
     * body: {id,user,title,content}
     */
    app.api("post", "comment-edit", update);

    /**
     * Xóa bài viết
     * url: /api/comment-delete
     * body: {id,user}
     */
    app.api("delete", "comment-delete", remove);
}