import {comparePassword , jwtToken ,  
    securityException} from "../security/securityConfig.js"
import { getPatient, getPatientByPassword } from "./patientServices.js";
import { apiRequestException } from "../exceptions/apiException.js";
import { getAdminByEmail, getAdminByPassword } from "./adminService.js";
import { findByID } from "../repository/patientRepo.js";




export const signInByAdmin =async (email , password)=>{
    await checkEmailOrPassword(email , password)
    const admin  = await getAdminByEmail(email) || securityException();
    const isCorrect = await getAdminByPassword(password)  ;
    console.log(isCorrect);
    if(!isCorrect) securityException();
    return { token : jwtToken(admin.accountType , admin.id) , adminInfo : admin }

}



export const signInByPatient =async (patientID , password)=>{
    const patient  = await findByID(patientID) ||   
    apiRequestException("PatientID  or password are incorrect", 403) ;
    const isCorrect = await getPatientByPassword(password)  ;
    if(!isCorrect)  apiRequestException("PatientID or password are incorrect", 403) ;;
    return  {token : jwtToken(patient.accountType , patient.patientID) , patientInfo : patient};
}



const checkEmailOrPassword = async (email = "", password= "" ) => {
    email =  !email ? "Email is required " : "valid";
    password = !password ? "password is required " : "Valid ";
      return   { email, password };
};
    