const mongoose = require('mongoose');

//collection ControlNode schema
const controlNodeSchema = new mongoose.Schema(
    {
        streetLightID: {    //refernces the streetlight it manages
            type: mongoose.Schema.ObjectId,
            ref: 'streetlights', // Reference to streetlight managed by this control node
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
        model:{
            type: String,
            trim:true
        }
    }
);
//creating a model for ControlNode collection
const ControlNode= mongoose.model('ControlNode',controlNodeSchema);
module.exports = ControlNode;
