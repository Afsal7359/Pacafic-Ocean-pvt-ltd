
const Job = require("../Model/Job");
const mongoose = require('mongoose');

module.exports={
    AddJob : async(req,res)=>{
        try {
           const Data = req.body
           console.log(Data,"Dtaa");
           await Job.create(Data)
              const datas = await Job.find().sort({_id:-1}).populate('Parties');
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
    EditJob: async (req, res) => {
        try {
          const jobId = req.params.id; 
          const updateData = req.body; 
      
          // Find the job by ID and update it with the new data
          const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
      
          if (!updatedJob) {
            return res.status(404).json({
              success: false,
              message: "Job not found",
            });
          }
      
          // Fetch the updated list of jobs (if needed)
          const datas = await Job.find().sort({ _id: -1 });
      
          res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: datas,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "server-error",
            error: error.message,
          });
        }
      },
    GetJob: async(req,res)=>{
        try {
            const JobData = await Job.find().sort({_id:-1}).populate('Parties');
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
          const id = req.query.id;
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
    },
    BlockEditandDelete : async (req, res) => {
      try {
        const { id } = req.params;  // Get the _id from the request parameters
    
        // Update the isBlocked value using findByIdAndUpdate
        const updatedParty = await Job.findByIdAndUpdate(
          id,  // The _id of the document to update
          { isBlocked: true },  // The field to update
          { new: true }  // Return the updated document
        );
    
        if (!updatedParty) {
          return res.status(404).json({ success: false, message: 'Job not found' });
        }
    
        res.status(200).json({
          success: true,
          message: 'Job Edit & Delete Blocked successfully',
          data: updatedParty,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message,
        });
      }
    },
    UnBlockEditandDelete: async(req,res)=>{
      try {
        const { id } = req.params;  // Get the _id from the request parameters
    
        // Update the isBlocked value using findByIdAndUpdate
        const updatedParty = await Job.findByIdAndUpdate(
          id,  // The _id of the document to update
          { isBlocked: false },  // The field to update
          { new: true }  // Return the updated document
        );
    
        if (!updatedParty) {
          return res.status(404).json({ success: false, message: 'Job not found' });
        }
    
        res.status(200).json({
          success: true,
          message: 'Job Edit & Delete Unblocked successfully',
          data: updatedParty,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message,
        });
      }
    },
  

    GetIndexNUmber : async(req,res)=>{
      try {
        const id = req.query.id;


        // Ensure the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({success:false, message: 'Invalid document ID' });
        }
    
        // Find all documents with _id less than or equal to the given id
        const count = await Job.countDocuments({
          _id: { $lte: new mongoose.Types.ObjectId(id) }
        });
    
     
    
        res.status(200).json({success:true, message: 'Success',data:count});
      } catch (error) {
        res.status(500).json({success:false, message: 'Error finding document index', error: error.message });
      }
    }
    
}