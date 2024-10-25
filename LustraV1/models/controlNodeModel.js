const mongoose = require("mongoose");

//collection ControlNode schema
const controlNodeSchema = new mongoose.Schema({
  status: {
    //current operational state
    type: String,
    enum: {
      values: ["functioning", "malfunctioning"],
      message: "Status is either: functioning or malfunctioning",
    },
    default: "functioning",
  },
  batteryLevel: {
    //bettery level percentage of the hardware
    type: Number,
    required: [true, "A motion sensor must have a battery level."],
  },
  model: {
    type: String,
    trim: true,
  },
  tvlightID: {
    //attribute to connect with the node's API for functions
    type: String,
    trim: true,
    requierd: true,
  },
});
//creating a model for ControlNode collection
const ControlNode = mongoose.model("ControlNode", controlNodeSchema);
module.exports = ControlNode;
