import express from "express";
import  cors  from 'cors';
import axios from 'axios';

import patientController from './controllers/patientController.js'
import adminController from './controllers/adminController.js'
import auth from './controllers/authController.js'
import exceptionHandler from "./exceptions/exception-handller.js";



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth/' , auth);
app.use('/api/patients/' , patientController);
app.use('/api/admins/' , adminController)

async function sendSMS(emailBody, phoneNumber) {

  try {
    const response = await axios.post(
        "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
          emailBody +
          "&rec=" +
          phoneNumber +
          ""
      )

    // Handle the response here
    console.log('Response:', response);
  } catch (error) {
    // Handle errors here
    console.error('Error:', error.message);
  }
}

// console.log(await sendSMS("Ciyaal xamar nahay" , "617612794"))

app.use(exceptionHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT} `)
})





