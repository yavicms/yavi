const User = require('yavi/db/mongo/users');
const { is } = require('yavi/lib');

module.exports = function (app) {

    /**
     * Lấy danh sách thông tin Users:
     * req.query: {role,status, page, limit, sort}
     *  - role: all, admin, user, creator, ...
     *  - status: published (đang hoạt động), wait (chờ duyệt), dashed (đã xóa), blocked (đã chặn)
     * result: {count: {all,admin,user,...}, list: []}
     */
    app.data("admin.users", async function (req) {

        var { status, role, page, limit, sort } = req.query;
        var $limit, $page, conditions = [];

        /**
         * Lấy theo role
         */
        if (role && role.length) {
            conditions.push({ $match: { "props.k": "role", "props.v": role } });
        }

        /**
         * Phân trang
         */
        $limit = Number(limit);
        $page = Number(page);

        if (!is.limit($limit)) $limit = 10;
        if (!is.limit($page)) $page = 1;

        conditions.push({ $skip: ($page - 1) * $limit }, { $limit });

        /**
         * Lấy danh sách users
         */
        return {
            count: { all: 0, admin: 0, user: 0 },
            list: await User.aggregate(conditions)
        }
    });

    /**
     * Thông tin chi tiết của user
     */
    app.data("admin.user", function (req) {

    });
}