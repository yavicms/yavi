
module.exports = function (Model) {

    Object.defineProperty(Model, "Add", {
        writable: false,
        value: async function (body) {
            try {

                var model = new Model(body);

                await model.save();

            } catch (error) {
                throw new Error("error_add_data");
            }
        }
    });
}