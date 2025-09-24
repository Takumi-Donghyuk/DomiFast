// Importaciones básicas
require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const PORT=3000||process.env.PORT;
const pool=require('../Base de datos/Conexion')
const session = require('express-session');
const bcrypt = require('bcryptjs');

// Importación de rutas
const rutasAutenticacion = require('../Backend/Rutas/rutaAutenticacion');
const rutasAdministrador = require('./Rutas/rutaAdministrador');
const rutasCliente = require('./Rutas/rutaCliente');
const rutasRepartidor = require('./Rutas/rutaRepartidor');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../Frontend')));

// Archivos ejs dinámicos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/Vistas'));

// Sesión
app.use(session({
  secret: process.env.SESION_SECRETA || 'unSecretoMuySeguro', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 
  }
}));

// Funciones para rutas protegidas
/* AuthMiddleware verifica si el usuario está logueado. Solo se fija si existe 
req.session.usuarioId. Si no existe, redirige al login. No verifica el rol,
solo la sesión activa */
function authMiddleware(req, res, next) {
  if (!req.session.usuario.usuarioId) {
    return res.redirect('/login');
  }
  next();
}
/* AuthRol verifica si el usuario tiene el rol correcto. Recibe un número 
de rol y compara req.session.rol con el rol permitido.Si no coincide, 
devuelve un error 403 */
function authRol(rolPermitido) {
  return (req, res, next) => {
    if (req.session.usuario.rol !== rolPermitido) {
      return res.status(403).send('No autorizado');
    }
    next();
  };
}

// Rutas generales
app.get('/', (req,res) => res.render('index'));
app.use('/login', rutasAutenticacion);
// Rutas protegidas
app.use('/admin', authMiddleware, authRol(1), rutasAdministrador);
app.use('/cliente', authMiddleware, authRol(2), rutasCliente);
app.use('/repartidor', authMiddleware, authRol(3), rutasRepartidor);
// Levantamiento del servidor
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando http://localhost:${PORT}`);
})



