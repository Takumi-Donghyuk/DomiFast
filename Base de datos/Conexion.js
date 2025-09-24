require('dotenv').config();
const pg=require('pg');
const pool=new pg.Pool({
    user: process.env.db_usuario,
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_name,
})

pool.connect()
.then(cliente=>{
    console.log('Conectado a Postgresql');
    cliente.release();
})
.catch(err=> console.error('Error conectando a la base de datos', err));

module.exports=pool;