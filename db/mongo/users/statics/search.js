const { is } = require('yavi/lib');

module.exports = function Search(User) {

    /**
     * Tìm kiếm người dùng
     * Đầu vào: info: { text, limit, page }
     */
    Object.defineProperty(User, "Search", {
        writable: false,
        value: async function (info) {

            if (is.object(info) && is.string(info.text) && info.text.length) {

                if (!is.number(info.limit)) info.limit = 10;
                if (!is.number(info.page)) info.page = 1;

                let skip = (info.page - 1) * info.limit;

                return this.find(
                    { $text: { $search: info.text } },
                    { score: { $meta: 'textScore' } }
                )
                    .sort({ score: { $meta: 'textScore' } })
                    .skip(skip)
                    .limit(limit);
            }
        }
    });
}