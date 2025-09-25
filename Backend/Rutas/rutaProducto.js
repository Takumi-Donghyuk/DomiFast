// routes/productos.js
const express = require('express');
const router = express.Router();
const controladorProducto = require('../Controladores/controladorProducto');

router.get('/', controladorProducto.listarProductos);

module.exports = router;
