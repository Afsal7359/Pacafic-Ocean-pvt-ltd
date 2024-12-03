const Employee = require("../Model/Employee");
const jwt = require('jsonwebtoken');
const Middle = require("../Model/Middlewear");

module.exports={
    LoginAdmin: async(req,res)=>{
        try {
            const Data = await Middle.find();
            if(Data[0].middle === "true"){
                return res.status(500).json({
                    status: false,
                    message: "server Down"
                })
            }
            let userInfo = req.body;
            console.log(userInfo,"req.body");
            const user = await Employee.findOne({ email: userInfo.email })
            console.log(user,"user");
            
            if (user) {
                let validaPassword
                if(req.body.password===user.password){
                    validaPassword=true
                }else{
                    validaPassword=false
                }

                if (!validaPassword) {
                    res.json({
                        success: false,
                        message: "Invalid Password !!"
                    })
                } else {
                    const tokens = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                    console.log(tokens,"tocken");
                    res.json({
                        success: true,
                        message: "logged in successfully",
                        data:tokens,
                        user:user
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "user Not Found !! Please Check your email Once More"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false, 
                message: 'Server Error'
            })
        }
    }
}