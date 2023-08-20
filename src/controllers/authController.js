import express from 'express'
const router = express.Router();
import { signInByAdmin, signInByPatient  } from '../services/authService.js';


router.post('/admin/sign-in/' , async(req,res , next)=>{
    try{
      const {email , password} = req.body
      const token  = await signInByAdmin(email , password) ;

      res.send(token)
    }catch(err){
        next(err)
    }
 })

router.post('/patient/sign-in' , async(req,res , next)=>{
    try{
      const {patientID , password} = req.body
      const token  = await signInByPatient(patientID , password);
    //  const patient = await  findByID(patientID)
      res.send(token)
    }catch(err){
        next(err)
    }  
 })


 export default  router;
