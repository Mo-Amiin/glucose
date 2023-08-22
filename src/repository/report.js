import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getpatientReport = async(id,date)=>{
console.log(date , "0----------");
const today = new Date(date);
console.log(today , "---------------llll");

const patient  = await prisma.patient.findFirst({where : {patientID : id} , select : {Report : {select : {id : true}}}});
if(!patient ) return null
const report = patient.Report.flat() ;
console.log(report);
const reportID = report[0]?.id;
if(reportID == undefined)  return null
const breakfastStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 43, 0);
const breakfastEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 45, 0);
const lunchStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 46, 0);
const lunchEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 48, 0);
const dinnerStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 49, 0);
const dinnerEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 59, 0);

const BodyTemp = await prisma.bodyTemp.findFirst({
  where: {
    date: {
      gte: breakfastStart,
      lte: breakfastEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

console.log(BodyTemp);

const glucose = await prisma.glucose.findFirst({
  where: {
    date: {
      gte: breakfastStart,
      lte: breakfastEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});


const roomTemp = await prisma.roomTemp.findFirst({
  where: {
    date: {
      gte: breakfastStart,
      lte: breakfastEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const Heart = await prisma.heart.findFirst({
  where: {
    date: {
      gte: breakfastStart,
      lte: breakfastEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const bodyTempLunch = await prisma.bodyTemp.findFirst({
  where: {
    date: {
      gte: lunchStart,
      lte: lunchEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const glucoseLunch = await prisma.glucose.findFirst({
  where: {
    date: {
      gte: lunchStart,
      lte: lunchEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});


const roomTempLunch = await prisma.roomTemp.findFirst({
  where: {
    date: {
      gte: lunchStart,
      lte: lunchEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const HeartLunch = await prisma.heart.findFirst({
  where: {
    date: {
      gte: lunchStart,
      lte: lunchEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const bodyTempDinner = await prisma.bodyTemp.findFirst({
  where: {
    date: {
      gte: dinnerStart,
      lte: dinnerEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const glucoseDinner = await prisma.glucose.findFirst({
  where: {
    date: {
      gte: dinnerStart,
      lte: dinnerEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});
const roomTempDInner = await prisma.roomTemp.findFirst({
  where: {
    date: {
      gte: dinnerStart,
      lte: dinnerEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const HeartDinner = await prisma.heart.findFirst({
  where: {
    date: {
      gte: dinnerStart,
      lte: dinnerEnd,
    },
    reportID : reportID
  },
  orderBy: {
    date: 'desc', 
  }, 
});

const transformedData = {
  Breakfast: {
    BodyTemp: {...BodyTemp},
    RoomTemp: {...roomTemp},
    Heart: {...Heart},
    glucose : {...glucose}
  } ,
  lunch: {
    BodyTemp: {...bodyTempLunch},
    RoomTemp: {...roomTempLunch},
    Heart: {...HeartLunch},
    glucose : {...glucoseLunch}

  } ,
  dinner: {
    BodyTemp: {...bodyTempDinner},
    RoomTemp: {...roomTempDInner},
    Heart: {...HeartDinner},
    glucose : {...glucoseDinner}
  } ,

};

if(transformedData == null) return null
return transformedData;

}


export const saveReport = async (patientId) => {
  return await prisma.report.create({data : {patientId : patientId}})
}
export const findReport = async () => {
    return await prisma.report.findMany({})
  }

// ---------------------------- Read ---------------------- //





export const findBodyTemp = async () => {
  return await prisma.bodyTemp.findFirst({ orderBy : {id : 'desc'}})
}


export const findRoomTemp = async () => {
  return await prisma.roomTemp.findFirst({ orderBy : {id : 'desc'}})
}



export const findHearBeat = async () => {
  return await prisma.heart.findFirst({ orderBy : {id : 'desc'}})
}

// ------------------------------- create ------------------------- //


export const BodyTemp = async (bodytemprature = {}) => {
    return await prisma.bodyTemp.create({ data: { ...bodytemprature } })
}



export const glucose = async (glucose = {}) => {
  return await prisma.glucose.create({ data: { ...glucose} })
}

export const RoomTemp = async (roomTemperature = {}) => {
  return await prisma.roomTemp.create({ data: { ...roomTemperature } })
}

export const heart = async (Heart = {}) => {
  return await prisma.heart.create({ data: { ...Heart } })
}






