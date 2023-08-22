import Joi from "joi"
import { apiRequestException } from '../exceptions/apiException.js'
import { patientSchema } from "./validation-schema.js"
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';
import  serviceAccount  from "../blood-glucose-67684-firebase-adminsdk-ojakt-19a34dbe39.json"  assert { type: "json" };
import  admin from 'firebase-admin';
import { getPatient } from "../services/patientServices.js";
// import { getPatientByID } from "../services/patientService.js";
;


const prisma = new PrismaClient();

export const validateUtil = (payload, schema) => {
  if (!payload) apiRequestException("Payload is not be null", 400);
  const { error, value } = Joi.validate(payload, schema);
  if (error) apiRequestException(`Error : ${error.details[0].message}`, 403);
  return value;
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blood-glucose-67684-default-rtdb.firebaseio.com/', // Replace with your Firebase project's database URL
});



export const db = admin.database();





export const sendPushNotification = async (id , title , body , deviceToken) => {
  const patientToken = await getPatient(id)
  if(!patientToken.deviceToken) return 
  const message = {
    notification: {
      title : title ,
      body :  body ,
    },
    token: deviceToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent notification:', response);
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};
