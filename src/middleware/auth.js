import { authorizeAccount } from "../security/securityConfig.js";




export default function authorize(req,res,next ){
   const token  = req.header('Authorization');
   if(!token) return res.status(401).json({Error: "Error" , message:"Access denied. no token provided"});
   try{
     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET );
    next();
   }catch(err){
      res.status(400).send("invalid token")
   }
}
