const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController.js');
const dishesController = require('./controllers/dishesController.js');
const salesController = require('./controllers/salesController.js');

// COM Restaurante

router
    .post('/auth', userController.authUser)
    .get('/getUsers', userController.getUsers)
    .post('/createUser', userController.createUser)
    .post('/newDish', dishesController.newDish)
    .get('/getDishes', dishesController.getDishes)
    .post('/updateDish', dishesController.updateDish)
    .get('/deleteDish/:id', dishesController.deleteDish)
    .post('/addSale', salesController.addSales)
    .get('/getSales', salesController.getSales)
    .get('/orderPlaced/:id', salesController.orderPlaced)
    .get('/getCompleteSales', salesController.getCompleteSales)

module.exports = router;