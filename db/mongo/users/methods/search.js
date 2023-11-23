const { is } = require('yavi/lib');

module.exports = function Search(schema, model) {

    /**
     * Tìm kiếm người dùng
     * Đầu vào: info: { text, limit, page }
     */
    schema.method("Search", async function (info) {

        if (is.object(info) && is.string(info.text) && info.text.length) {

            if (!is.number(info.limit)) info.limit = 10;
            if (!is.number(info.page)) info.page = 1;

            let skip = (info.page - 1) * info.limit;

            return model.find(
                { $text: { $search: info.text } },
                { score: { $meta: 'textScore' } }
            )
                .sort({ score: { $meta: 'textScore' } })
                .skip(skip)
                .limit(limit);
        }
    });
}