
const Job = require("../Model/Job");

module.exports={
    AddJob : async(req,res)=>{
        try {
           const Data = req.body
           console.log(Data,"Dtaa");
           await Job.create(Data)
              const datas = await Job.find().sort({_id:-1});
              res.status(200).json({
                success:true,
                message:"Job Added Successfully",
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
    GetJob: async(req,res)=>{
        try {
            const JobData = await Job.find().sort({_id:-1})
            res.status(200).json({
                success:true,
                message:"Job Data Fetched Successfully",
                data:JobData,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Server Error",
                error:error.message,
            })
        }
    },
    DeleteJob: async(req,res)=>{
        try {
            const id = req.params;
            const JobData = await Job.findByIdAndDelete(id)
          
                res.status(200).json({
                    success:true,
                    message:"Deleted Successfully",
                    // data:Data,
                })

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Server - error"
            })
        }
    }
}