const socket = WS();

/**
 * Ẩn/hiện sidebar
 */
$(".toggle-sidebar").click(function () {
    $(".container").toggleClass("show-bar");
});

/**
 * Chạy single page
 */
$(".sidebar .spa").on("click", function (e) {

    let $this = $(this), container = $(".container");

    Promise.all([
        e.preventDefault(),
        /**
        * Lấy mã nguồn HTML từ server
        */
        spa(socket, this.href, function (html) {

            let $container = $(html).find(".container");

            $(".main").html($container.find(".main").html());

            container.attr("class", $container.attr("class"));
        }),
        /**
         * Xóa class "show-bar" của .container
         */
        container.removeClass("show-bar"),
        /**
         * Xóa số thông báo trong attribute "data-count"
         */
        $this.attr('data-count') !== undefined ? $this.attr("data-count", 0) : undefined
    ]);
});
