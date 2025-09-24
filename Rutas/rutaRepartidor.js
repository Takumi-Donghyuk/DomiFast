const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('menu_repartidor', { usuario: req.session.usuario });
});

module.exports = router;
