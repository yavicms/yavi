try {

    const View = require("yavi/server/view");
    const Plugin = require("yavi");

    const plugin = new Plugin(__dirname);

    /**
     *  Xử lí các request từ Client tùy từng Controller riêng
     *  Trả về giá trị là View Data Object : title, header, posts, ...
     */

    plugin.hook("head", function (request) {

        let view = new View(plugin.dir, request);

        switch (request.router_name) {
            case "home":
                return view.view("index");
        }
    });

    module.exports = plugin;

}
catch (e) {
    console.log(e);
}