const { Schema, model } = require("mongoose");

const paises = new Schema(
    {
        name: {
            type: String
        },
        code: {
            type: String
        }
    }
);

const paisesModel = model("paises", paises);
module.exports = {
    paisesModel
}