import { apiRequestException } from '../exceptions/apiException.js'
import { patientSchema, patientSchemam } from "../utility/validation-schema.js"
import {validateUtil} from '../utility/utlity.js'
import {findmany,findByNumber , save ,
     update , deletePatient, isExist , findByID, findByPassowrd } from "../repository/patientRepo.js"
import { saveReport } from '../repository/report.js'


export const savePatient = async(patient={})=>{
    await validateUtil(patient , patientSchema)
    const isPatientExist = await isExist(patient.email)
    if(isPatientExist) return  apiRequestException(`Error: this patient is already registered`, 403)
    await save(patient);
    await saveReport(patient.patientID)

}
export const getPatientByPassword =async (id )=>{
  return await findByPassowrd(id)
}

export const getPatient = async(id)=>{
  return (
    (await findByID(id)) || 
     apiRequestException(`Error: patient of this id ${id} is not found -----`, 404)
  );
}



export const allPatient = async()=>{
   return await findmany();
}

export const updatePatient = async(id , patient = {})=>{
    const patientId = await getPatient(id);
    if(!patientId) return   apiRequestException(`Error: patient of this id ${id} is not found`, 404);
    await validateUtil(patient , patientSchemam)
    return await update(id , patient) 

};


export const deletePatients =async (id)=>{
    const patientId = await findByID(id);
    if(!patientId) return   apiRequestException(`Error: patient of this id ${id} is not found`, 404)
    return await deletePatient(id) 
}




export const  stateData =  (currentData , highData  , lowData)=>{
  if(currentData >=  highData ) {
   return "High"
  }else if (currentData > lowData && currentData <= highData){
   return "Normal"
  }else if(currentData < lowData){
   return "low"
  }
}
