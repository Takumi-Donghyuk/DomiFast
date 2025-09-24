const pool = require('../../Base de datos/Conexion');

async function buscarPorCorreo(correo) {
  const resultado = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
  return resultado.rows[0]; 
}

module.exports = {
  buscarPorCorreo
};
