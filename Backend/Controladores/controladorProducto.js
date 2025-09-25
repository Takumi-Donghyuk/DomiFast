const modeloProductos = require('../Modelos/modeloProductos');

async function listarProductos(req, res) {
  try {
    const productos = await modeloProductos.getAllProductos();
    res.render('catalogo', { productos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener productos');
  }
}

module.exports = {
  listarProductos
};