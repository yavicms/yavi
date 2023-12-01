module.exports = function (req, query) {
    req.query = query;
    req.method = req.method.toLowerCase();
    req.body = {};
}