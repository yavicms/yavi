const find = require('yavi/cms/router/api/post/find');
const detail = require('yavi/cms/router/api/post/detail');
const add = require('yavi/cms/router/api/post/add');
const update = require('yavi/cms/router/api/post/update');
const remove = require('yavi/cms/router/api/post/remove');
const search = require('yavi/cms/router/api/post/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/posts?{limit,page,field:"user,tags,comments"}
     */
    app.content("get.api.posts", find);

    /**
     * Lấy bài viết chi tiết
     * url: /api/post?{id, field:"user,tags,comments"}
     */
    app.content("get.api.post", detail);

    /**
     * Tìm kiếm bài viết:
     * url: /api/post-search?{q}
     */
    app.content("get.api.post-search", search);

    /**
     * Tạo bài viết mới
     * url: /api/post-new
     * body: {title,content,user,type}
     */
    app.content("put.api.post-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/post-edit
     * body: {id,user,title,content}
     */
    app.content("post.api.post-edit", update);

    /**
     * Xóa bài viết
     * url: /api/post-delete
     * body: {id,user}
     */
    app.content("delete.api.post-delete", remove);
}