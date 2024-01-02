const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/top-cryptos', cryptoController.getTopCryptos);
router.get('/convert', cryptoController.validateInput, cryptoController.convertCurrency);

module.exports = router;
