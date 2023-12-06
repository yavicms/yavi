module.exports = function (req, query) {
    req.x_yavi_type = req.headers["x-yavi-type"];
    req.query = query;
    req.method = req.method.toLowerCase();
    req.body = {};
}