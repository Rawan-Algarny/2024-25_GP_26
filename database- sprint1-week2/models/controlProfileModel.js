const mongoose = require('mongoose');

//collection ControlProfile schema
const controlProfileSchema = new mongoose.Schema(
    {
        controlNodeID: {    //refernces the control node connected to
            type: mongoose.Schema.ObjectId,
            ref: 'controlnodes', 
            default: null
        },
        startTime:{
            type:Date
        }, 
        endTime:{
            type:Date
        },
        startDate:{
            type: Date
        },
        endDate:{
            type:Date
        },
        BrightnessLevel:{  //brightness level percentage of the luminaire
            type: Number,
            required: [true, 'A street light must have a brightness level.'] 
        },
        power:{      //current operational state
            type: String,
            enum: {
              values: ['on', 'off'],
              message: 'the streetlight is either: on or off'
            },
            default: 'off'
        }
    }
);
//creating a model for ControlProfile collection
const ControlProfile= mongoose.model('ControlProfile',controlProfileSchema);
module.exports = ControlProfile;