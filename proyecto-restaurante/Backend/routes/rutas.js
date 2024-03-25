const express = require('express');
const router = express.Router();
const restauranteControladores = require('./controladores/restau.js');
router

    // .post('/consultarUsuario', restauranteControladores.consultarUsuario)
    .get('/usuariosOb', restauranteControladores.obtenerUsuarios)
    .post('/usuariosAg', restauranteControladores.agregarUsuario)
    .post('/usuariosEdit', restauranteControladores.actualizarUsuario)
    .delete('/usuariosEli/:id', restauranteControladores.eliminarUsuario)

// ---------------------------------------------------------------------------------------------------------------------------------------
    .post('/consultarUsuario', restauranteControladores.consultarUsuario)
    .get('/productosOb', restauranteControladores.obtenerProductos)
    .post('/productosAg', restauranteControladores.agregarProducto)
    .post('/productosEdit', restauranteControladores.actualizarProducto)
    .delete('/productosEli/:id', restauranteControladores.eliminarProducto)
// ---------------------------------------------------------------------------------------------------------------------------------------
module.exports = router;