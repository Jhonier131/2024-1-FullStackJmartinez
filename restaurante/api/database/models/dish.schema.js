const { Schema, model } = require("mongoose");

const DishSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
);

const DishModel = model("dishes", DishSchema);
module.exports = {
    DishModel
}