const { is } = require('yavi/lib');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports = function (schema, model) {

    schema.method("User", async function (user_id, $limit, page) {

        try {

            if (!is.number($limit)) $limit = 10;
            if (!is.number(page)) page = 1;

            if (!ObjectId.isValid(user_id)) user_id = new ObjectId(user_id);

            if (user_id) {

                let $skip = (page - 1) * $limit;

                if ($skip < 0) {
                    $limit = 10;
                    $skip = 0;
                }

                return await model.aggregate([

                    // Tìm kiếm bài viết của người dùng
                    { $match: { user: user_id } },

                    // Sắp xếp theo thời gian tạo giảm dần (mới nhất trước)
                    { $sort: { created: -1 } },

                    // Phân trang
                    { $skip },
                    { $limit },

                    // Liên kết với Tag thông qua tags field
                    {
                        $lookup: {
                            from: "yavi_tags", // Tên collection của Tag
                            localField: "tags",
                            foreignField: "_id",
                            as: "tags"
                        }
                    },

                    // Giữ lại các trường cần thiết từ Tags
                    {
                        $addFields: {
                            tags: {
                                $map: {
                                    input: "$tags",
                                    as: "tag",
                                    in: {
                                        _id: "$$tag._id",
                                        title: "$$tag.title",
                                        type: "$$tag.type"
                                    }
                                }
                            }
                        }
                    },

                ]);
            }

        } catch (error) {

        }
    });
}