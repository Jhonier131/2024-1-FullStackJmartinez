const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const authController = require('./controllers/userController.js');


router
    .post('/login', signoController.validarUsuario)
    .get('/', signoController.getAllSignos)
    .post('/consultarSignos', signoController.getOneSigno)
    .post('/signoEditar', signoController.updateSigno)

module.exports = router;