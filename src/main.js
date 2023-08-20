import express from "express";
import  cors  from 'cors';

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


app.use(exceptionHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT} `)
})





