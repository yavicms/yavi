module.exports = function (req, query) {
    req.x_yavi_type = req.headers["x-yavi-type"];
    req._yavi_spa = req.x_yavi_type === "html";
    req.query = query;
    req.method = req.method.toLowerCase();
    req.body = {};
}