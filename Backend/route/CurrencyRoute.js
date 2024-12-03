const express = require('express');
const Currency = require('../Controller/Currency');
const UsdCurrency = require('../Controller/UsdCurrency');
const router = express.Router();

router.post('/add-currency',Currency.AddCurrency);
router.get('/get-currency',Currency.GetCurrency);
router.post('/edit-currency',Currency.EditCurrency);

router.post('/add-usdcurrency',UsdCurrency.AddCurrency);
router.get('/get-usdcurrency',UsdCurrency.GetCurrency);
router.post('/edit-usdcurrency',UsdCurrency.EditCurrency);



module.exports=router;