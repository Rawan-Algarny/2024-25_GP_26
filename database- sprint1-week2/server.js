//everything that connects with the servers
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const Admin = require('./models/adminModel'); 
const ControlNode= require('./models/controlNodeModel');
const MotionSensor = require('./models/motionSensorModel'); 
const StreetLight = require('./models/streetLightModel'); 



dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(    //connection string
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


mongoose.connect(DB,{   //connecting to the database
    serverSelectionTimeoutMS: 50000
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err.message));;



/*
//create  admin document
const newAdmin= new Admin({
    "username":'amal aldawish',
    "password":'Amal198Amal',
    "email": 'amal@gmail.com'
});

//save doc to DB
newAdmin.save().then(doc=>{
    console.log(`this was saved! ${doc}`);
}).catch(err=>{
    console.log('error:',err)
});



//create  ControlNode document
const newControlNode= new ControlNode({
    "streetLightID":'670d2e2e296af5a26cb51d3b',
    "status":'offline',
    "createdAt": "2024-10-14T19:45:23.000Z"
});

//save doc to DB
newControlNode.save().then(doc=>{
    console.log(`this was saved! ${doc}`);
}).catch(err=>{
    console.log('error:',err)
});



//create  StreetLight document
const newStreetLight= new StreetLight({
    "status":'off',
    "brightnessLevel":0,
    "location": {
      type: 'Point',
      coordinates: [-73.935242, 40.730610], 
      address: 'New York, NY, USA'
    }
});

//save doc to DB
newStreetLight.save().then(doc=>{
    console.log(`this was saved! ${doc}`);
}).catch(err=>{
    console.log('error:',err)
});



//create  MotionSensor document
const newMotionSensor= new MotionSensor({
    "streetLightID":'670d2e2e296af5a26cb51d3b',
    "status":'offline',
    "detectionRange":5,
    "lastDetectedMovement": "2024-10-12T10:20:30.000Z",
    "createdAt": "2024-10-14T19:45:23.000Z"
});

//save doc to DB
newMotionSensor.save().then(doc=>{
    console.log(`this was saved! ${doc}`);
}).catch(err=>{
    console.log('error:',err)
});
*/
// read all documents in collectin Admin
Admin.find().then(doc=>{
    console.log(doc);
});