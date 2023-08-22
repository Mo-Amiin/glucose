import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();





export const findmany =async()=>{
  return await prisma.patient.findMany({});
}

export const save = async (patient={})=>{
   return await prisma.patient.create({data:patient});
}

export const findByPassowrd = async(password)=>{
   return await prisma.patient.findFirst({where:{password : password}})
}

export const countPatient = async()=>{
   return await prisma.patient.count({})
}


export const updateDeviceToken  = async(patientID, deviceToken)=>{
   return await prisma.patient.update({where : {patientID : patientID} , data : {deviceToken:deviceToken}})
}


export const findByID = async(patientID)=>{
   return await prisma.patient.findFirst({where:{patientID : patientID} })
}



export const findByNumber = async(number)=>{
   return await prisma.patient.findFirst({where:{tell:number}});
}


export const update = async(id ,patient={} )=>{
   return await prisma.patient.update({
      where:{patientID:id} ,
      data : {...patient}});
}


export const deletePatient = async(patientID) =>{
   return await prisma.patient.delete({where:{patientID : patientID}})
}


export const isExist = async(email)=>{
    const PatientEmail =await prisma.patient.findFirst({where:{email:email}})
    return  PatientEmail
}



export const saveNotification = async (Notification = {})=>{
   return await prisma.notification.create({data : {...Notification }})
}

export const getPatientNotification = async (patientId)=>{
   return await prisma.notification.findMany({where : {patientId :patientId }});
}