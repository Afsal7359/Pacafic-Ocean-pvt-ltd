
const Usdcurrency = require("../Model/Usdcurrency");

module.exports={
    AddCurrency : async(req,res)=>{
        try {
            const data = req.body;
            await Usdcurrency.create(data);
            const datas = await Usdcurrency.find()
            res.status(200).json({
                success:true,
                message:"Currency Added Successfully",
                data:datas
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
    GetCurrency: async(req,res)=>{
        try {
            const data = await Usdcurrency.find();
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
    EditCurrency: async (req, res) => {
        try {
            console.log(req.body,"req");
            const { _id, exchangeRate } = req.body;
            const updatedCurrency = await Usdcurrency.findByIdAndUpdate(
                _id,
                { exchangeRate },
                { new: true } 
            );
            
            if (!updatedCurrency) {
                return res.status(404).json({
                    success: false,
                    message: "Currency not found"
                });
            }
            const Data = await Usdcurrency.find()
            res.status(200).json({
                success: true,
                message: "Currency Updated Successfully",
                data: Data
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }
    
}