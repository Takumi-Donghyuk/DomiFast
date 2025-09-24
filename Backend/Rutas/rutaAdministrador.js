const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('menu_admin');
});

module.exports = router;
