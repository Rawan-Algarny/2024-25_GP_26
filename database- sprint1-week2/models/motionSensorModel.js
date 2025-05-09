const mongoose = require('mongoose');

//collection MotionSensor schema
const motionSensorSchema = new mongoose.Schema(
    {
        streetLightID: {    //refernces the streetlight connected to
            type: mongoose.Schema.ObjectId,
            ref: 'streetlights', // Reference to streetlight connected to this motion sensor
            default: null
        },
        status: {      //current operational state
            type: String,
            enum: {
              values: ['functioning', 'malfunctioning'],
              message: 'Status is either: functioning or malfunctioning'
            },
            default: 'functioning'
        },
        range: {   //distance (in meters) within which the sensor can detect movement
            type: Double,
            required: [true, 'A motion sensor must have a detection range'],
        },
        batterylevel: {  //bettery level percentage of the hardware
            type: Double,
            required: [true, 'A motion sensor must have a battery level.'] 
        },
        model:{
            type: String,
            trim:true
        }
    }
);
//creating a model for ControlNode collection
const MotionSensor= mongoose.model('MotionSensor',motionSensorSchema);
module.exports = MotionSensor;
