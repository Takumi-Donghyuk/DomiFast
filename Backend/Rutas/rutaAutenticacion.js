const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../Controladores/controladorAutenticacion');

//Vista login
router.get('/', (req, res)=> res.render('login'));
//login
router.post('/', controladorAutenticacion.login);
//registro---------
//router.post('/register', controladorAutenticacion.register);
//-------------
//logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('No se pudo cerrar sesión');
    }
    res.redirect('/login'); 
  });
});

module.exports = router;
