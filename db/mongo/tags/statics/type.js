const { is } = require('yavi/lib');

module.exports = function Type(Tag) {

    /**
     * Lấy danh sách tags theo thể loại
     * Đầu vào gồm:
     * - type
     * - limit
     * - page
     */
    Object.defineProperty(Tag, "getType", {
        writable: false,
        value: async function (type, limit, page) {

            try {

                if (is.string(type) && type.length) {

                    if (!is.number(limit)) limit = 10;
                    if (!is.number(page)) page = 1;

                    return await model.find({ type })
                        .skip((page - 1) * limit)
                        .limit(limit);
                }
                else {
                    throw new Error("tags");
                }

            } catch (error) {
                throw new Error(error.message);
            }
        }
    });
}