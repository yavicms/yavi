const find = require('./find');
const detail = require('./detail');
const add = require('./add');
const update = require('./update');
const remove = require('./remove');
const search = require('./search');

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