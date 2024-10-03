const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(401).json({message:"Token süresi geçerli değil"})
    }
    jwt.verify(token,"SECRET_KEY",(err,user)=>{
        if(err) res.status(401).json({message:"Token geçersiz"})
        req.user=user
        next();
    })
}

const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id==req.params.id||req.user.idAdmin){
            next();
        }
        else{
            res.status(401).json({message:"Login değilsin"})
        }
    })
}
const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.idAdmin){
            next();
        }
        else{
            res.status(401).json({message:"Admin değilsin"})
        }
    })
}

module.exports={verifyToken,verifyUser,verifyAdmin}