const jwt = require('jsonwebtoken');
const JWT_Secret = 'thisisnotesavewebsite';


const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token')
    // console.log(token);
    if(!token){
        res.status(401).json({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Internal server error"})
    }

}

module.exports = fetchuser;