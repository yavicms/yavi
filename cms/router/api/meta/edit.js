const Meta = require("yavi/db/mongo/metas");

module.exports = function (app) {

    function getData(body, list) {

        var $set = {}, next = 0, value;

        list.forEach(function (name) {
            if (value = body[name]) {
                $set[name] = value;
                next = 1;
            }
        });

        if (next) return $set;
    }

    /**
     * Chỉnh sửa thẻ Meta
     * req.body: {_id}
     * req.cookies: {token}
     * req.User
     */
    app.content("post.api.meta-edit", async function (req) {
        try {
            var body = req.body,
                $set = getData(body, ["collection", "type", "key", "title"]);

            if ($set) await Meta.updateOne({ _id: body._id }, { $set });

        } catch (error) {
            throw new Error("error_update_meta");
        }
    });
}