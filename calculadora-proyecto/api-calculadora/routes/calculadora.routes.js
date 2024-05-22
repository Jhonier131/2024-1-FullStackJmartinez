const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/operaciones', calculadoraControllers.operaciones)

module.exports = router;