const find = require('yavi/cms/router/api/comment/find');
const detail = require('yavi/cms/router/api/comment/detail');
const add = require('yavi/cms/router/api/comment/add');
const update = require('yavi/cms/router/api/comment/update');
const remove = require('yavi/cms/router/api/comment/remove');
const search = require('yavi/cms/router/api/comment/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/comments?{limit,page,field:"user,tags,comments"}
     */
    app.content("get.api.comments", find);

    /**
     * Lấy bài viết chi tiết
     * url: /api/comment?{id, field:"user,tags,comments"}
     */
    app.content("get.api.comment", detail);

    /**
     * Tìm kiếm bài viết:
     * url: /api/comment-search?{q}
     */
    app.content("get.api.comment-search", search);

    /**
     * Tạo bài viết mới
     * url: /api/comment-new
     * body: {title,content,user,type}
     */
    app.content("put.api.comment-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/comment-edit
     * body: {id,user,title,content}
     */
    app.content("post.api.comment-edit", update);

    /**
     * Xóa bài viết
     * url: /api/comment-delete
     * body: {id,user}
     */
    app.content("delete.api.comment-delete", remove);
}