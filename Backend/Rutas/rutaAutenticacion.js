const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../Controladores/controladorAutenticacion');


router.get('/', (req, res)=> res.render('login'));
router.post('/', controladorAutenticacion.login);
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
