const { is } = require('yavi/lib');

module.exports = function (Props) {

    Object.defineProperty(Props, "Search", {
        writable: false,
        value: async function ($search, type) {
            if (is.string($search) && $search.length) {

                let conditions = [];

                if (is.string(type) && type.length) {
                    conditions.push({ $match: { type, $text: { $search } } });
                }
                else {
                    conditions.push({ $match: { $text: { $search } } });
                }

                // Sắp xếp theo điểm liên quan nhất
                conditions.push({ $sort: { score: { $meta: "textScore" } } });

                return await model.aggregate(conditions);
            }
        }
    });
}