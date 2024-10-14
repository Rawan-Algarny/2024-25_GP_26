const mongoose = require('mongoose');

//collection ControlNode schema
const controlNodeSchema = new mongoose.Schema(
    {
        streetLightID: {    //refernces the streetlight it manages
            type: mongoose.Schema.ObjectId,
            ref: 'streetLight', // Reference to streetlight managed by this control node
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
        createdAt: {   //when the control node was added to the system
            type: Date,
            default: Date.now,
        }
        
    }
);

const ControlNode= mongoose.model('ControlNode',controlNodeSchema);
module.exports = ControlNode;