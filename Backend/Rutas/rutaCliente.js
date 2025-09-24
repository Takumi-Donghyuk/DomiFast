const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('menu_cliente', { usuario: req.session.usuario });
});

module.exports = router;
