const pool = require('../../Base de datos/Conexion');

async function buscarPorCorreo(correo) {
  const resultado = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
  return resultado.rows[0]; 
}
//register--------------
/*async function crear(usuario) {
  const resultado = await pool.query(
    `INSERT INTO usuarios (nombre, usuario, correo, telefono, contrasena, id_rol)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [usuario.nombre, usuario.usuario, usuario.correo, usuario.telefono, usuario.contrasena, usuario.id_rol]
  );
  return resultado.rows[0];
}*/
//-----------------

module.exports = {
  buscarPorCorreo/*,
  crear*/
  //, crear--------lo agregado
};
