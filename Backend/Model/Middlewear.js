const mongoose = require('mongoose');

const MiddlewearSchema = new mongoose.Schema({
    middle:{
        type:String,
    }
})
const Middle = mongoose.model('Middle',MiddlewearSchema);
module.exports=Middle;