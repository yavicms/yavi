const list = require("yavi/cms/data/posts/list");
const meta = require("yavi/cms/data/posts/meta");

module.exports = function (app) {

    /**
     * Lấy danh sách bài viết
     */
    list(app);
}