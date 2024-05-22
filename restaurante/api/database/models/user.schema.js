const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        rol: {
            type: Number,
            required: true
        }
    }
);

const UserModel = model("users", UserSchema);
module.exports = {
    UserModel
}