const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('api/top-cryptos', cryptoController.getTopCryptos);
router.get('api/convert', cryptoController.validateInput, cryptoController.convertCurrency);

module.exports = router;
