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
                canEditJob:data.canEditJob,
                canDeleteJob:data.canDeleteJob,
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
    UpdateEmployee: async (req, res) => {
        try {
            const data = req.body;
            const employeeId = data.id; 
            
            // Find existing employee
            const existingEmployee = await Employee.findById(employeeId);
            if (!existingEmployee) {
                return res.status(404).json({
                    success: false,
                    message: "Employee not found"
                });
            }
    
            // Handle profile image upload if new image is provided
            let profileImageUrl = existingEmployee.profileImage; // Keep existing image by default
            if (req.file) {
                // Upload new image to cloudinary
                const profileImage = await cloudinary.uploader.upload(req.file.path, { 
                    folder: 'PacaficOcean' 
                });
                profileImageUrl = profileImage.secure_url;
            }
    
            // Create update object with only provided fields
            const updateData = {
                dateOfJoining: data.dateOfJoining || existingEmployee.dateOfJoining,
                name: data.name || existingEmployee.name,
                employeeId: data.employeeId || existingEmployee.employeeId,
                email: data.email || existingEmployee.email,
                region: data.region || existingEmployee.region,
                position: data.position || existingEmployee.position,
                number: data.number || existingEmployee.number,
                profileImage: profileImageUrl,
                canEditJob: data.canEditJob !== undefined ? data.canEditJob : existingEmployee.canEditJob,
                canDeleteJob: data.canDeleteJob !== undefined ? data.canDeleteJob : existingEmployee.canDeleteJob,
            };
    
            // Only update password if new password is provided
            if (data.password) {
                updateData.password = data.password;
            }
    
            // Update employee
            await Employee.findByIdAndUpdate(
                employeeId,
                updateData,
                { new: true, runValidators: true }
            );
    
            // Fetch updated list of employees
            const employees = await Employee.find().sort({_id: -1});
    
            res.status(200).json({
                success: true,
                message: "Employee Updated Successfully",
                data: employees
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "server-error",
                error: error.message
            });
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
    },
    GetEmployeeById :async(req,res)=>{
        try {
            const id = req.params.id;
            const data = await Employee.findById(id);
            res.status(200).json({
                success:true,
                message:"Data Fetch Successfully",
                data:data
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "server-error",
            })
        }
    }
}
