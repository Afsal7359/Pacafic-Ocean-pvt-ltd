const express = require('express');
const Currency = require('../Controller/Currency');
const router = express.Router();

router.post('/add-currency',Currency.AddCurrency);
router.get('/get-currency',Currency.GetCurrency);
router.post('/edit-currency',Currency.EditCurrency);

module.exports=router;