const Meta = require('yavi/db/mongo/metas');

module.exports = function (app) {

    app.content("post.api.meta-new", async function (req) {
        try {
            var meta = new Meta(req.body);

            await meta.save();

        } catch (error) {
            throw new Error("error_add_meta");
        }
    });
}