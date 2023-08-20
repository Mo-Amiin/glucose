import Joi from "joi"



export const adminSchema = {
    id: Joi.number().optional(),
    name: Joi.string().min(2).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
  };

export const patientSchema = {
    id:Joi.number().optional(),
    name : Joi.string().min(2).max(100).required(),
    patientID : Joi.string().min(5).max(13).required(),
    age: Joi.string().min(1).max(200).required(),
    tell : Joi.string().required(),
    email : Joi.string().email().required(),
    sex : Joi.string().required(),
    password: Joi.string().min(3).required(),
    deviceToken : Joi.string().optional(),
    adminId : Joi.number().required()
}

export const patientSchemam = {
  id:Joi.number().optional(),
  name : Joi.string().min(2).max(100).required(),
  patientID : Joi.string().min(5).max(13).required(),
  age: Joi.string().min(1).max(200).required(),
  tell : Joi.string().required(),
  email : Joi.string().email().required(),
  sex : Joi.string().required(),
  password: Joi.string().min(3).required(),
  deviceToken : Joi.string().optional(),
  adminId : Joi.number().required()
}



