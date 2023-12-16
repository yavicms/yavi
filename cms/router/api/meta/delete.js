const { isValidObjectId } = require("mongoose");
const Meta = require("yavi/db/mongo/metas");

module.exports = function (app) {

    app.content("delete.api.meta-delete", async function (req) {
        try {
            var _id = req.body._id;

            if (isValidObjectId(_id)) await Meta.deleteOne({ _id });

        } catch (error) {
            throw new Error("error_delete_meta");
        }
    });
}