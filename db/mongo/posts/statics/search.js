const { is } = require('yavi/lib');

module.exports = function Search(Post) {

    Object.defineProperty(Post, "Search", {
        writable: false,
        value: async function ($search, $limit, page) {

            try {

                /**
                 * Tìm kiếm bài viết dựa trên: title, content
                 */

                if (is.string($search) && $search.length) {

                    if (!is.number($limit)) $limit = 10;
                    if (!is.number(page)) page = 1;

                    let $skip = (page - 1) * $limit;

                    if ($skip < 0) {
                        $skip = 0;
                        $limit = 10;
                    }

                    return await model.aggregate([

                        // condition
                        { $match: { $text: { $search } } },

                        // Sắp xếp theo điểm liên quan nhất
                        { $sort: { score: { $meta: "textScore" } } },

                        // Phân trang
                        { $skip },
                        { $limit },

                        // Liên kết với User thông qua "post.user" field
                        {
                            $lookup: {
                                from: "yavi_users", // Tên collection của User
                                localField: "user",
                                foreignField: "_id",
                                as: "user"
                            }
                        },

                        // Liên kết với Tag thông qua tags field
                        {
                            $lookup: {
                                from: "yavi_tags", // Tên collection của Tag
                                localField: "tags",
                                foreignField: "_id",
                                as: "tags"
                            }
                        },

                        // Giữ lại các trường cần thiết từ User và Tags
                        {
                            $addFields: {
                                user: {
                                    $let: {
                                        vars: {
                                            userObj: { $arrayElemAt: ["$user", 0] }
                                        },
                                        in: {
                                            _id: "$$userObj._id",
                                            fullname: "$$userObj.fullname",
                                            role: "$$userObj.role",
                                            thumb: "$$userObj.thumb",
                                            created: "$$userObj.created"
                                        }
                                    }
                                },
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
                        }
                    ]);
                }

            } catch (error) {
                throw new Error(error.message);
            }
        }
    });
};