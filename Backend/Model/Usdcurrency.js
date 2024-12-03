const mongoose = require('mongoose');

const UsdCurrencySchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    exchangeRate:{
        type:Number,
        require:true,
        trim:true,
    }
})
const Usdcurrency =mongoose.model("UsdCurrency",UsdCurrencySchema);
module.exports = Usdcurrency;   