const { Schema } = require("mongoose");

module.exports = {

    /**
     * Thông tin đăng nhập: 
     * - k: email, username, phone, id
     * 
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
     * Địa chỉ
     */
    address: [Object],

    /**
     * Birthday
     */

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
     *  Tên
     */
    name: {
        first: { type: String, required: true, trim: true },
        last: { type: String, required: true, trim: true }
    },

    /**
     * ảnh đại diện
     */
    thumb: String
}