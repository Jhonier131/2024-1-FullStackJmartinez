const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbDishes = fs.readFile(path.join(__dirname,'../../db/dishes.json'));
const { DishModel } = require('../../database/models/dish.schema');


const newDish = async (req, res) => {
    try {
        console.log(req.body);
        const { name, price, description } = req.body;
        await DishModel.create({name, price, description})
        const dishes = await getAllDishes();
        response(res, { payload: dishes, msg: "Se creo el plato" });
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const updateDish = async (req, res) => {
    try {
        console.log('Plato update');
        console.log(req.body);
        const { _id, name, price, description } = req.body;
        const dish = {
            name,
            price,
            description
        };
        await DishModel.updateOne({_id}, dish);
        
        const dishes = await getAllDishes();
        response(res, { payload: dishes, msg: "Se actualizo el plato" });
        
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getDishes = async (req, res) => {
    try {
        const dishes = await getAllDishes();
        console.log('dishes>>>>');
        console.log(dishes);
        response(res, {payload: dishes});
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const deleteDish = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteDish = await DishModel.deleteOne({_id})
        const dishes = await DishModel.find();
        response(res, {payload: dishes, msg: "Se elimino el plato correctamente."});
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getAllDishes = async () => {
    const dishes = await DishModel.find();
    return dishes;
}

module.exports = {
    newDish,
    getDishes,
    updateDish,
    deleteDish
}