const { isValidObjectId } = require("mongoose");
const { is } = require("yavi/lib");
const ActionList = ["$push", "$pull", "$set", "$unset"];

module.exports = function (Model) {

    /**
     * Chỉnh sửa dữ liệu options:
     * body: {_id, key, value, action}
     *  - action (MongoDB action): $push, $pull, $set, $unset
     */

    Object.defineProperty(Model, "Update", {
        writable: false,
        value: async function (body) {
            try {

                if (is.object(body) && isValidObjectId(body._id)) {

                    var update = {}, next = 0;

                    if (is.string(body.key)) {
                        update.$set = { key: body.key };
                        next++;
                    }

                    if (!is.undefined(body.value)) {
                        if (ActionList.includes(body.action)) {
                            update[body.action] = { value: body.value };
                            next++;
                        }
                    }

                    if (next) {
                        await Model.updateOne({ _id: body._id }, update);
                        return;
                    }
                }

                throw new Error("error_input_data");

            } catch (error) {

                throw new Error("error_input_data");

            }
        }
    });
}