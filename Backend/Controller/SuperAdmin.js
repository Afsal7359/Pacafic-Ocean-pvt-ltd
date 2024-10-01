const Middle = require("../Model/Middlewear");
const Superadmin = require("../Model/SuperAdmin");
const jwt = require('jsonwebtoken');

module.exports={
    LoginSuperAdmin : async(req,res)=>{
        const Data = await Middle.find();
        if(Data[0].middle === "true"){
            return res.status(500).json({
                status: false,
                message: "server Down"
            })
        }
        console.log('loginnnnnnnnnnnnnnnnnnn',req.body);
        try {
            const user = await Superadmin.findOne({ username: req.body.email })
            if (user) {
                let validaPassword
                if(req.body.password===user.password){
                    validaPassword=true
                }else{
                    validaPassword=false
                }

                if (!validaPassword) {
                    throw new Error("Invalid password !");
                } else {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                    console.log(token,"tocken");
                    res.json({
                        success: true,
                        message: "user logged in successfully",
                        data:token,
                    })
                }
            } else {
                throw new Error("user not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
}