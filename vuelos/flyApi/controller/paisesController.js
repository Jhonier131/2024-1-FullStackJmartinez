const { response } = require("./helpers/dataResponse");
const { paisesModel } = require('../database/models/paises.schema');


const getPaisesSelect = async (req, res) => {
    try {
        const paises = await paisesModel.find();
        response(res, { payload: paises})
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getPaisesSelect
}