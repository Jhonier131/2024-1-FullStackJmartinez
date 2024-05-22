const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbUser = fs.readFile(path.join(__dirname,'../../db/users.json'));
const { UserModel } = require('../../database/models/user.schema')


const authUser = async (req, res)=>{
    console.log('user');
    try {
        const { name, password } = req.body
        const user = await UserModel.findOne({name})

        if (user) {
            if(user.password === password) {
                response(res, { payload: user, msg: "Se inicio Sesion correctamente" });
            } else {
                response(res, { msg: "Error al  consultar usuario", statusCode: 404 });
            }
        }else {
            response(res, { msg: "Usuario y/o contraseña incorrecta.", statusCode: 404 });
        }
    }  catch (error) {
        return res.status(500).json(error.message);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        response(res, {payload: users});
    } catch (error) {
        return res.status(500).json(error.message);
    }
} 

const createUser = async (req, res) => {
    console.log('usu');
    console.log(req.body);
    try {
        const { name, password, rol } = req.body;

        const newUser = {
            name,
            password,
            rol: parseInt(rol)
        }
        await UserModel.create(newUser)
        const users = await getAllUsers();


        response(res, { payload: users, msg: "Se Creo el usuario." });

    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getAllUsers = async () => await UserModel.find();

module.exports = {
    authUser,
    getUsers,
    createUser
}