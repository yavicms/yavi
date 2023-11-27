const { Schema } = require("mongoose");

module.exports = {

    /**
     * Thông tin đăng nhập: 
     * - k: email, username, phone, id
     * 
     * Lấy danh sách người dùng:
     * - k: role, status
     */
    login: [
        {
            k: { type: String, trim: true, required: true },
            v: { type: String, trim: true, required: true }
        }
    ],

    /**
     * Mật khẩu
     */
    password: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Mã đăng kí
     */
    active_key: {
        type: String,
        default: null
    },

    /**
     * Chức vụ:
     * - quản trị viên:     admin
     * - cộng tác viên:     editor
     * - khách:             subscriber
     */
    role: {
        type: String,
        required: true,
        default: "subscriber"
    },

    /**
     *  Trạng thái tài khoản:
     *  - đang hoạt động:       published
     *  - đang bị khóa:         block
     *  - đã bị xóa:            trash
     *  - đang chờ xét duyệt:   dash
     */
    status: {
        type: String,
        enum: ["published", "blocked", "trash", "dash"],
        required: true,
        default: "dash"
    },

    /**
     *  Tên
     */
    name: {
        first: { type: String, required: true, trim: true },
        last: { type: String, required: true, trim: true }
    },

    /**
     * Phục vụ tìm kiếm: fullname, username, content
     */
    fullname: String,
    username: String,
    /**
     * Mô tả, giới thiệu
     */
    content: String,

    /**
     * ảnh đại diện
     */
    thumb: String,

    /**
     * Các thông tin mở rộng
     */
    props: [
        {
            k: { type: String, required: true, trim: true },
            v: { type: Schema.Types.Mixed, required: true }
        }
    ]
}