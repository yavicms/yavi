
module.exports = function (req, options) {
    req.query = options.query;
    req.body = options.body;
    req.method = options.method;
    req.type = options.type;
    req.issocket = 1;
}