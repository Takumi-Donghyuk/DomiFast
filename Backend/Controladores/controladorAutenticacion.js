const bcrypt = require('bcryptjs');
const modeloUsuario = require('../Modelos/modeloUsuario');

async function login(req, res) {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await modeloUsuario.buscarPorCorreo(correo);
    const contrasenaValida = usuario && await bcrypt.compare(contrasena, usuario.contrasena);
    if (!usuario || !contrasenaValida) {
    return res.status(400).render('login', { error: 'Credenciales inválidas' });
    }
  // Guardar datos mínimos en sesión
  req.session.usuario = {
  usuarioId: usuario.id_usuario,
  rol: usuario.id_rol,
  nombre: usuario.nombre,
  direccion: usuario.direccion,
  correo: usuario.correo,
  telefono: usuario.telefono,
  fecha_registro: usuario.fecha_registro
  };
    // Redirigir según rol
    if (usuario.id_rol === 1) return res.redirect('/admin');
    if (usuario.id_rol === 2) return res.redirect('/cliente');
    if (usuario.id_rol === 3) return res.redirect('/repartidor');
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: 'Error en el servidor' });
  }
}
//register-----------------------
/*async function register(req, res) {
    const { nombre, usuario, correo, telefono, contrasena } = req.body;

  try {
    //Encritar contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await modeloUsuario.crear({
      nombre,
      usuario,
      correo,
      telefono,
      contrasena: hash,
      id_rol: 2 // cliente por defecto
    });
//guardar BDD
    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
}*/
//-----------------------------

module.exports = {
  login/*,
  register*/
  //, register-------lo agregado
};
