const find = require('yavi/cms/router/api/props-user/find');
const detail = require('yavi/cms/router/api/props-user/detail');
const add = require('yavi/cms/router/api/props-user/add');
const update = require('yavi/cms/router/api/props-user/update');
const remove = require('yavi/cms/router/api/props-user/remove');
const search = require('yavi/cms/router/api/props-user/search');

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết:
     * url: /api/props-user?{limit,page,field:"user,tags,comments"}
     */
    app.content("get.api.props-user", find);

    /**
     * Tìm kiếm bài viết:
     * url: /api/props-user-search?{q}
     */
    app.content("get.api.props-user-search", search);

    /**
     * Lấy bài viết chi tiết
     * url: /api/props-user-detail?{id, field:"user,tags,comments"}
     */
    app.content("get.api.props-user-detail", detail);

    /**
     * Tạo bài viết mới
     * url: /api/props-user-new
     * body: {title,content,user,type}
     */
    app.content("put.api.props-user-new", add);

    /**
     * Chỉnh sửa bài viết
     * url: /api/props-user-edit
     * body: {id,user,title,content}
     */
    app.content("post.api.props-user-edit", update);

    /**
     * Xóa bài viết
     * url: /api/props-user-delete
     * body: {id,user}
     */
    app.content("delete.api.props-user-delete", remove);
}