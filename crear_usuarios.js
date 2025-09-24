const bcrypt = require('bcryptjs');
const pool = require('../Base de datos/Conexion'); 

async function main() {
  // Datos del cliente
  const clienteEmail = 'cliente@domifast.com';
  const clientePass = 'cliente7*';
  const clienteNombre = 'Cliente Prueba';
  const clienteRol = 2;
  const clienteDireccion='Cra. 6b#56-6';
  const clienteTelefono='7778885665';

  // Datos del repartidor
  const repartidorEmail = 'repartidor@domifast.com';
  const repartidorPass = 'repartidor7*';
  const repartidorNombre = 'Repartidor Prueba';
  const repartidorRol = 3; 
  const repartidorDireccion='Cll. 12d#34-3';
  const repartidorTelefono='3224564545';

  // Hashear contraseñas
  const hashCliente = await bcrypt.hash(clientePass, 12);
  const hashRepartidor = await bcrypt.hash(repartidorPass, 12);

  // Insertar en la base de datos
  await pool.query(
    'INSERT INTO usuarios (nombre, direccion, telefono, correo, contrasena, id_rol) VALUES ($1, $2, $3, $4, $5, $6)',
    [clienteNombre, clienteDireccion, clienteTelefono, clienteEmail, hashCliente, clienteRol]
  );

  await pool.query(
    'INSERT INTO usuarios (nombre, direccion, telefono, correo, contrasena, id_rol) VALUES ($1, $2, $3, $4, $5, $6)',
    [repartidorNombre, repartidorDireccion, repartidorTelefono, repartidorEmail, hashRepartidor, repartidorRol]
  );

  console.log('Usuarios creados correctamente');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
