const jwt = require("jsonwebtoken");
const Yavi = require("yavi");

module.exports = function (use, app) {

    use("admin", function (request, response, next) {

        let redis = Yavi.redis;

        if (!redis) return next();

        redis.get("token:count", function (err, count) {
            if (err) return next();
            if (!count) {
                count = 1;
                redis.set("token:count", count);
            }
        });

    });
}