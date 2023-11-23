const { is } = require('yavi/lib');

module.exports = function Search(schema, model) {

    /**
     * Tìm tags bằng chức năng tìm kiếm văn bản gợi ý:
     * - _id, title, content
     * 
     * Thông tin đầu vào (info) gồm:
     * - info.text
     * - info.type: tag, category, country, time
     */
    schema.method("Search", async function (info) {

        try {

            let error_message = "tags",
                condition = {},
                extra = { score: { $meta: 'textScore' } };

            if (is.object(info) && is.string(info.text) && info.text.length) {

                if (!is.number(info.limit)) info.limit = 10;
                if (!is.number(info.page)) info.page = 1;

                let skip = (info.page - 1) * info.limit;

                /**
                 * Trong phần "đăng bài viết mới",
                 * thường thì người viết sẽ tìm từ khóa của "tag/category",
                 * khi đó, chỉ cần tìm ở trường "_id và title" mà thôi.
                 */
                switch (info.type) {
                    case "tag":
                    case "category":
                        condition.type = info.type;
                        extra._id = 1;
                        extra.title = 1;
                        break;
                }

                condition["$text"] = { "$search": info.text };

                return await model.find(condition, extra)
                    .sort({ score: { $meta: 'textScore' } })
                    .skip(skip)
                    .limit(info.limit);
            }

            throw new Error(error_message);

        } catch (error) {
            throw new Error(error.message);
        }
    });
}