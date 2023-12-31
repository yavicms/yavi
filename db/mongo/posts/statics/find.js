const { is } = require('yavi/lib');

module.exports = function (Post) {

    /**
     * Lấy danh sách bài viết dựa trên:
     * - điều kiện lọc bài viết: options.post : {}
     * - điều kiện đối với user: options.user : {}
     * - điều kiện đối với tag : options.tag  : {}
     * - phân trang và limit:    options.page, options.limit
     * - sắp xếp bài viết:       options.sort
     */
    Object.defineProperty(Post, "Find", {
        writable: false,
        value(options, $limit, $page) {
            try {

                if (!options) options = {};

                let $condition = [];

                /**
                 * Điều kiện tìm kiếm
                 */

                /**
                 * Phân trang 
                 */
                if (!is.number($limit) || $limit < 1) $limit = 10;
                if (!is.number($page) || $page < 1) $page = 1;
                $condition.push({ $skip: ($page - 1) * $limit }, { $limit });

                /**
                 * Liên kết với User
                 */
                $condition.push({
                    $lookup: {
                        from: "yavi_users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                });

                /**
                 * 
                 */
                return Post.aggregate($condition);

            } catch (error) {
                throw error;
            }
        }
    });
    Object.defineProperty(Post, "Finds", {
        writable: false,
        value: async function (options) {

            try {
                if (is.object(options) && is.object(options.post)) {

                    let $options = [];

                    if (options.post) {
                        $options.push({ $match: options.post });
                    }

                    /**
                     * Liên kết với User thông qua user field
                     */
                    $options.push({
                        $lookup: {
                            from: "yavi_users", // Tên collection của User
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    });

                    /**
                     *  Điều kiện của người dùng
                     *  ví dụ: Chỉ lấy những người dùng có trạng thái là "published"
                     *         options.user = { "user.props.k": "status", "user.props.v": "published" }
                     */
                    if (is.object(options.user)) {
                        $options.push({ $match: options.user });
                    }

                    /**
                     * Liên kết với Tag thông qua tags field
                     */
                    // $options.push({
                    //     $lookup: {
                    //         from: "yavi_tags", // Tên collection của Tag
                    //         localField: "tags",
                    //         foreignField: "_id",
                    //         as: "tags"
                    //     }
                    // });

                    /**
                     * Điều kiện của Tags
                     * ví dụ: Chỉ lấy những bài viết có tags có "type" là "tag"
                     *        options.tag = { "tags.type": "tag" }
                     */
                    if (is.object(options.tag)) {
                        $options.push({ $match: { k: "tag", v: options.tag } });
                    }

                    /**
                     * Điều kiện sắp xếp bài viết
                     * ví dụ: options.sort = { created: -1 }
                     */
                    if (!is.object(options.sort)) options.sort = { created: - 1 };

                    $options.push({ $sort: options.sort });

                    /**
                     * Phan trang
                     */
                    if (!is.number(options.limit) || options.limit < 1) options.limit = 10;
                    if (!is.number(options.page) || options.limit < 1) options.page = 1;

                    $options.push({ $skip: (options.page - 1) * options.limit });
                    $options.push({ $limit: options.limit });

                    return Post.aggregate($options);
                }
            } catch (error) {
                throw new Error(error.message);
            }


        }
    });

};