

const jwt = require('jsonwebtoken');
require('dotenv').config();
refeshAuthorization = (req,res,next) => {
    const refeshAuthorization = req.headers['refeshauthorization'];
    // Beaer [token] 
    const token = refeshAuthorization.split(' ')[1];
    if(!token){
        res.status(401).json({success:false,message:'UnAuthorization Error'})
    }
    jwt.verify(token,process.env.REFESH_TOKEN_SECRET, (error,data)=>{
        if(error) res.status(403).json({success:false,message:"Please go back to the previous page , you do not have permission to access this link!"});
        next();
    })
    
}


module.exports = refeshAuthorization