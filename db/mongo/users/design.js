const { Schema } = require("mongoose");

module.exports = {

    /**
     * Thông tin đăng nhập: 
     * - k: email, username, phone, id
     */
    login: [
        {
            k: { type: String, required: true },
            v: { type: Schema.Types.Mixed, unique: true, required: true }
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
    code: String,
    verify: String,

    /**
     * Thông tin công khai:
     * - username, first_name, last_name, avatar, gender
     */
    public: Object,

    /**
     * Lưu các thông tin cài đặt của User
     */
    setting: [
        {
            k: { type: String, trim: true, required: true },
            v: { type: Schema.Types.Mixed, required: true }
        }
    ],

    /**
     * Phục vụ tìm kiếm: 
     * search.k: fullname, username, content
     * search.v: ...
     */
    search: [
        {
            k: { type: String, trim: true, required: true },
            v: { type: String, trim: true, required: true }
        }
    ],

    /**
     * Lấy danh sách người dùng:
     * - k: role, status
     * 
     * Chức vụ: 
     * - k: role
     * - v: admin (quản trị viên), editor (cộng tác viên), user (khách)
     * 
     *  Trạng thái tài khoản: 
     * - k: status
     * - v: published (đang hoạt động), block (bị khóa), trash (đã xóa), dash (đang chờ xét duyệt)
     * 
     */
    props: [
        {
            k: { type: String, trim: true, required: true },
            v: { type: Schema.Types.Mixed, required: true }
        }
    ]
}