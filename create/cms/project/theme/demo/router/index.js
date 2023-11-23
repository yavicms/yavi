const SearchController = require("yavi/create/cms/project/theme/demo/router/controller");

module.exports = function SearchRouter(request, response, page) {

    /**
     * Page mặc định là "home"
     */
    if (!page) page = "home";

    request.page = page;

    /**
     * Chạy Controller tương ứng với "page"
     */
    let action = SearchController[page];

    if (action) return action(request, response, page);

    /**
     * Nếu "page" không tồn tại thì chạy ErrorController
     */
    request.page = "error";

    SearchController.Error(request, response, page);
};