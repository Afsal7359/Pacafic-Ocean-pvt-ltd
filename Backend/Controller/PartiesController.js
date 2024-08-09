const Parties = require("../Model/PartiesModel");
const cloudinary = require("../utils/Cloudinary");

module.exports={
    AddParties : async(req,res)=>{
        try {
            const category = JSON.parse(req.body.category);
             const category2 = JSON.parse(req.body.category2);
            const data = req.body;
            console.log(data,"data");
            const { gstphoto, panphoto } = req.files;
            const gstImageResult = gstphoto ? await cloudinary.uploader.upload(gstphoto[0].path, { folder: 'PacaficOcean' }) : null;
            const panImageResult = panphoto ? await cloudinary.uploader.upload(panphoto[0].path, { folder: 'PacaficOcean' }) : null;
            const newParty = new Parties({
                name: data.name,
                address: data.address,
                number1: data.number1,
                number2: data.number2,
                email1: data.email1,
                email2: data.email2,
                representative: data.representative,
                webLink: data.webLink,
                gstphoto: gstImageResult ? gstImageResult.secure_url : null,
                panphoto: panImageResult ? panImageResult.secure_url : null,
                gst: data.gst,
                state:data.state,
                statecode:data.statecode,
                panNo: data.panNo,
                category:category,
                category2:category2,
              });
          
              await newParty.save();
              const datas = await Parties.find().sort({_id:-1});
              res.status(200).json({
                success:true,
                message:"Party Added Successfully",
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
    GetParties: async(req,res)=>{
        try {
            const PartiesData = await Parties.find().sort({_id:-1})
            res.status(200).json({
                success:true,
                message:"Parties Data Fetched Successfully",
                data:PartiesData,
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
    DeleteParties: async(req,res)=>{
        try {
            const id = req.params.id;
            // if (Deletedata) {
            //     const publicIdgst = Deletedata.gstphoto.split('/').pop().split('.')[0];
            //     const publicIdpan = Deletedata.panphoto.split('/').pop().split('.')[0];
        
            //     const [destroyResult, destroyResult2] = await Promise.all([
            //         cloudinary.uploader.destroy(publicIdgst),
            //         cloudinary.uploader.destroy(publicIdpan)
            //     ]);
            // }
          
                await Parties.findByIdAndDelete({_id:id});
                // const Data= await Parties.find()
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