const mongoose = require('mongoose');

//collection MotionSensor schema
const motionSensorSchema = new mongoose.Schema(
    {
        streetLightID: {    //refernces the streetlight connected to
            type: mongoose.Schema.ObjectId,
            ref: 'streetLight', // Reference to streetlight connected to this motion sensor
            default: []
        },
        status: {      //current operational state
            type: String,
            enum: {
              values: ['online', 'offline', 'maintenance'],
              message: 'Status is either: online, offline, or maintenance'
            },
            default: 'offline'
        },
        detectionRange: {   //distance (in meters) within which the sensor can detect movement
            type: Number,
            required: [true, 'A motion sensor must have a detection range'],
        },
        lastDetectedMovement: {  //timestamp of the most recent movement detected by the sensor
            type: Date,
            default: null 
        },
        createdAt: {  //when the motion sensor was added to the system
            type: Date,
            default: Date.now,
        }
    }
);

const MotionSensor= mongoose.model('MotionSensor',motionSensorSchema);
module.exports = MotionSensor;