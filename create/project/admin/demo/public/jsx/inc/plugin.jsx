const { socket } = require("yavi/create/cms/project/admin/demo/public/jsx/inc/socket");

/**
 * Click vào checkbox
 */
$(document).on("click", ".checkable", function (e) {
    $(this).prev().click();
});

/**
 * Lấy những plugin đã kích hoạt để gửi lên server
 */
$(document).on("click", "#submit-plugin", function (e) {
    e.preventDefault();

    let list = [],
        btn = this,
        url = socket.get_url_admin("demo", "save-plugin-list");

    btn.disabled = true;

    $(".plugin-name:checked").each(function () {
        list.push(this.value);
    });

    socket.json(url, list)
        .then(() => btn.disabled = false);
});
