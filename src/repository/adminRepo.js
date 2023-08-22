import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();





export const findmany =async()=>{
    return await prisma.admin.findMany({});
    
  }
  
  export const count = async()=>{
     return await prisma.admin.count({});
  }

  export const findByPassowrd = async(password)=>{
   return await prisma.admin.findFirst({where:{password : password}})
}
  
  export const findLatestPatients = async(id)=>{
     return await prisma.admin.findFirst({where:{id:Number(id) } , include : {patient : true} , orderBy : {id:'desc'}})
  }

  export const  findId = async(id)=>{
   return await prisma.admin.findFirst({where:{id:Number(id) } , include : {patient : true }  })
}

  
  export const findByEmail = async(email)=>{
     return await prisma.admin.findFirst({where:{email:email}});
  }
  export const save = async (admin={})=>{
     return await prisma.admin.create({data:admin});
  }
  
  export const update = async(id ,admin={} )=>{
     return await prisma.admin.update({
        where:{id:Number(id)} ,
        data : {...admin}});
  }
  
  export const deleteById = async(id) =>{
     return await prisma.admin.delete({where:{id:Number(id)}})
  }
  
  
  export const isExistAdmin = async(email)=>{
      const adminEmail =await  prisma.admin.findFirst({where:{email:email}}) 
      return  adminEmail
  }
  
  