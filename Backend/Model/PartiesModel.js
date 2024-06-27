const mongoose = require("mongoose");

const partiesSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    address:{
        type:String,
        require:true,
        trim:true,
    },
    number1:{
        type:Number,
        require:true,
        trim:true,
    },
    number2:{
        type:Number,
        trim:true,
    },
    email1:{
        type:String,
        require:true,
        trim:true,
    },
    email2:{
        type:String,
        trim:true,
    },
    representative:{
        type:String,
        require:true,
        trim:true,
    },
    webLink:{
        type:String,
        require:true,
        trim:true,
    },
    category: {
        type: [],
        required: true
      },
    category2: {
        type: [],
        required: true
      },
    
    gst:{
        type:String,
        require:true,
        trim:true,
    },
    panNo:{
        type:String,
        require:true,
        trim:true,
    },
  
    gstphoto:{
        type:String,
        require:true,
        trim:true,
    },
    panphoto:{
        type:String,
        require:true,
        trim:true,
    },

})
const Parties = mongoose.model("Parties",partiesSchema);
module.exports = Parties