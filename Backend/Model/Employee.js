const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  
        dateOfJoining:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        employeeId:{
            type:String,
            require:true,
        },
        name:{
            type:String,
            require:true,
        },
        number:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        position:{
            type:String,
            require:true,
        },
        profileImage:{
            type:String,
            require:true,
        },
        region:{
            type:String,
            require:true,
        },
        canDeleteJob:{
            type:Boolean,
            require:true
        },
        canEditJob:{
            type:Boolean,
            require:true
        }

})
const Employee = mongoose.model("Employee",EmployeeSchema);
module.exports = Employee;