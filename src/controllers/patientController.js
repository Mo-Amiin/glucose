import express from 'express'
import { allPatient, deletePatients, getPatient, savePatient, stateData, updatePatient } from '../services/patientServices.js';
import authorize from "../middleware/auth.js"
import { Role } from '../security/securityConfig.js';
import  admin from 'firebase-admin';
import  serviceAccount  from "../blood-glucose-67684-firebase-adminsdk-ojakt-19a34dbe39.json"  assert { type: "json" };
import { BodyTemp, RoomTemp, findBodyTemp, findReport, getpatientReport, glucose, heart } from '../repository/report.js';
import { PrismaClient } from "@prisma/client";

const router = express.Router();


const prisma = new PrismaClient();



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blood-glucose-67684-default-rtdb.firebaseio.com/', // Replace with your Firebase project's database URL
});


const db = admin.database();

const today = new Date();
console.log(today);


router.get('/currentSensorData/:id' ,async (req, res) => {  
  const {id} = req.params ;
  const patient  = await prisma.patient.findFirst({where : {patientID : id} , select : {Report : {select : {id : true}}}});
  if(!patient ) return res.status(401).json({error : "Errorthis id is not found"});
  const report = patient.Report.flat() ;
  const reportID = report[0]?.id;

    const BodyTempUrl = db.ref('/Bodytemp'); 
    BodyTempUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 38 , 35)
      await BodyTemp({data  , reportID , state });

    });


    const RoomTempUrl = db.ref('/RoomTemp'); 
    RoomTempUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 38 , 35)
      await RoomTemp({data , reportID , state})
    });

    const HeartBeatUrl = db.ref('/HeartBeat');
    HeartBeatUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 10 , 5 )
      await heart({data , reportID , state})
      return res.status(200).json(realTime_SensorData)
    });
  
})
  

router.post('/reportAdd/:id', async (req, res  , next) => {
  const {id} = req.params ;
  const patient  = await prisma.patient.findFirst({where : {patientID : id} , select : {Report : {select : {id : true}}}});
  if(!patient ) return res.status(401).json({error : "Error this id is not found"});
  const report = patient.Report.flat() ;
  const reportID = report[0]?.id;
  console.log(req.body);
const data = req.body.data ;
const type = req.body.type ;

console.log(req.body.type);


    if(req.body.type === "Blood Sugar"){
      console.log("walaa soo galay");
      const state = stateData(data , 10 , 5 );
      await glucose({ data, type,reportID , state})
      return res.status(200).json({message :"Success blood suger"});

    }
    
    if(req.body.type == 'Body Temperature'){
      const state = stateData(data , 10 , 5 )
      await BodyTemp({data , type,reportID , state})
      return res.status(200).json({message :"Success body tempreature"});


    }
    
    if(req.body.type == 'Room Temperature'){
      const state = stateData(data , 10 , 5 )
      await RoomTemp({data , type, reportID , state})
      return res.status(200).json({message :"Success room tempreture "});


    } if(req.body.type == 'Heart Beat'){
      const state = stateData(data , 10 , 5 )
      await heart({data , type,reportID , state})
      return res.status(200).json({message :"Success heart "});

    }

    return res.status(200).json({message :"Invalid From input"});

})

  

router.get('/', async (req, res , next) => {
  try{
    const patients = await allPatient();
    res.send(patients)
  } catch(e){
    next(e);
  } 
})

router.get('/patientReport/:id/:date',async (req,res,next)=>{
  try{
    const {id,date} = req.params ;
    const report = await getpatientReport(id,date);
    res.status(200).json(report)
  }catch(e){
    next(e)
  }
});

router.get('/report/',async (req,res)=>{
  try{
    const report = await prisma.bodyTemp.findMany({})
    res.send(report)
  }catch(e){
    next(e)
  }
})
  
router.get('/:id',async (req, res , next) => {
  try{
    const {id} = req.params ;
    const patients = await getPatient(id);
    res.send(patients)
  }catch(e){
     next(e)       
  }
})

router.post('/', async (req, res  , next) => {
  try{
    await savePatient(req.body)
    res.send('Successfully created')
  }catch(e){
    next(e)
  }
})

  

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const patients = await updatePatient(id, req.body);
    res.send(patients);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id/', async (req, res, next) => {
  try {
    const { id } = req.params;
    const patients = await deletePatients(id);
    res.send(patients);
  } catch (error) {
    next(error);
  }
});


// router.get('/bodytemp/tt', async(req,res)=>{
//   const dd = await prisma.BodyTemp.findMany({});
//   res.send(dd)
// })

export default router
