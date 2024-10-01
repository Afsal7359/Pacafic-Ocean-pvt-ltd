const Employee = require("../Model/Employee");
const cloudinary = require("../utils/Cloudinary");

module.exports={
    AddEmployee : async(req,res)=>{
        try {
            const data = req.body;
            console.log(data,"data");
            const  profileImage  = req.file;
            const profileImages = profileImage ? await cloudinary.uploader.upload(profileImage.path, { folder: 'PacaficOcean' }) : null;
           
            const newEmployee = new Employee({
                dateOfJoining: data.dateOfJoining,
                name: data.name,
                employeeId: data.employeeId,
                email: data.email,
                region: data.region,
                profileImage:profileImages ? profileImages.secure_url : null,
                position: data.position,
                password: data.password,
                number: data.number,
              });
          
              await newEmployee.save();
              const datas = await Employee.find().sort({_id:-1});
              res.status(200).json({
                success:true,
                message:"Employee Added Successfully",
                data:datas
              })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"server-error",
                error:error.message
            })
        }
    },
    GetEmployee: async(req,res)=>{
        try {
            const data = await Employee.find().sort({_id:-1});
            res.status(200).json({
                success:true,
                message:"Data Fetch Successfully",
                data:data,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Server Error",
                error:error
            })
        }
    },
    DeleteEmployee: async(req,res)=>{
        try {
            const id = req.params.id;
      
                await Employee.findByIdAndDelete({_id:id});
                // const Data= await Parties.find()
                res.status(200).json({
                    success:true,
                    message:"Deleted Successfully",
                    // data:Data,
                })

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Server-error"
            })
        }
    }
}