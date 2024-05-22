const express = require('express');
const router = express.Router();
const paisesController = require('../controller/paisesController');
const reservasController = require('../controller/reservaController');


router
    .get('/getpaises', paisesController.getPaisesSelect)
    .get('/getreservas', reservasController.getReservas)
    .post('/addreserva', reservasController.createReserva)
    

module.exports = router;