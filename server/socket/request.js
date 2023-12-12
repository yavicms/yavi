
module.exports = function (req, options) {
    req.query = options.query;
    req.body = options.body;
    req.method = options.method;
    req.x_yavi_type = options.type;
    req._yavi_spa = options.type === "html";
    req.issocket = 1;
}