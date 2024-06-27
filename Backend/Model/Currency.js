const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    exchangeRate:{
        type:Number,
        require:true,
        trim:true,
    }
})
const Currency = mongoose.model("Currency",CurrencySchema);
module.exports = Currency;