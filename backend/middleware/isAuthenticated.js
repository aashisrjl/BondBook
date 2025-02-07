const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const User = require("../database/models/user.model");


exports.isAuthenticated = async(req,res,next)=>{
    console.log("Auth middleware is called")
    try {
        const token = req.cookies.token;
        console.log("Token is:",token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"can't find token"
        });
    }
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    console.log("Decoded id is:",decoded)
    if(!decoded){
        console.log("can't decode")
        return
    };

    const decodedId = decoded.id;
    console.log("DecodedId is",decodedId)
   const user =  await User.findById({_id:decodedId})
    console.log("User is:",user)
    if(!user){
        return res.status(401).json({
            success:false,
            message:"You are not logged in" 
        });
    }
    req.user = user;
    req.userId = user._id;
    next();
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error in iaAuthentication"
        })
        
    }
    
}