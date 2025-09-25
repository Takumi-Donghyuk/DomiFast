const pool = require('../../Base de datos/Conexion'); 

async function getAllProductos() {
  const { rows } = await pool.query('SELECT * FROM Productos WHERE activo=TRUE');
  return rows;
}

module.exports = {
  getAllProductos
};
