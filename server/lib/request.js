
module.exports = function (request, query) {
    request.query = query;
    request.method = request.method.toLowerCase();

    request.yavi_hook = {};
    request.yavi_data = {};
    request.yavi_filter = {};
    request.yavi_content = {};
}