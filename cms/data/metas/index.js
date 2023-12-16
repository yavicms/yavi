const Meta = require("yavi/db/mongo/metas");
const { loop } = require("yavi/lib");

module.exports = function (app) {

    /**
     * Lấy danh sách Post Metas
     * req.query: {type}
     */
    app.data("admin.meta-post", function (req) {

        var conditions = { collection: "yavi_posts" };

        if (req.query.type) conditions.type = req.query.type;

        return {
            list: Meta.find(conditions)
        }
    });

    app.data("admin.meta-post-new", async function (req) {

        var data = {};

        try {

            var metas = await Meta.aggregate([
                {
                    $group: {
                        _id: "$type", // Nhóm theo giá trị của trường "type"
                        documents: { $push: "$$ROOT" } // Tạo một mảng chứa các documents
                    }
                },
                {
                    $project: {
                        _id: 0,
                        type: "$_id", // Đặt lại tên trường là "type"
                        documents: 1 // Chọn trường documents
                    }
                }
            ]);

            loop(metas, function (meta) {
                data[meta.type] = meta.documents;
            });

            return data;


        } catch (error) {

            return data;

        }
    });
}