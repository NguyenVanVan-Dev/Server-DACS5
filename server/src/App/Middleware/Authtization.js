
const jwt = require('jsonwebtoken');
require('dotenv').config();
authMiddleware = (req,res,next) => {
    let token = null;
    const authorizationHeader = req.headers['authorization'];
    // Beaer [token] 
    if(authorizationHeader)
    {
        token = authorizationHeader.split(' ')[1];
    }
    if(!token){
        res.status(401).json({success:false,message:'UnAuthorization Error'})
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error,data)=>{
        if(error) res.status(403).json({success:false,message:"Please go back to the previous page , you do not have permission to access this link!"});
        next();
    })
}


module.exports = authMiddleware