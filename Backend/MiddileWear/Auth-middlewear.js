const jwt = require( "jsonwebtoken")
const AppError = require("../utils/AppError");
const Middle = require("../Model/Middlewear");


const userAuthMid = async(req, res, next) => {
    console.log(req.headers,"dddddddddddddddddddd");
    const Data = await Middle.find();
    if(Data[0].middle === "true"){
        return res.status(500).json({
            status: false,
            message: "server Down"
        })
    }
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // console.log(token,"mid token");
    if (!token) {
        return res.status(500).json({
            status: false,
            message: "userNot found"
        })
    }
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(userId,'userId');
        if(!userId){
            return res.status(403).json({
                status: false,
                message: "invalid token"
            })
        }
        req.userId = userId
        next()
    } catch (error) {
        return res.status(403).json({
            status: false,
            message: "invalid token please login"
        })
    }
}

module.exports= userAuthMid