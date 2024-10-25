const mongoose = require("mongoose");

//collection ControlProfile schema
const controlProfileSchema = new mongoose.Schema({
  controlNodeID: {
    //refernces the control node connected to
    type: mongoose.Schema.ObjectId,
    ref: "controlnodes",
    default: null,
  },
  startTimestamp: {
    type: Date,
  },
  endTimestamp: {
    type: Date,
  },
  BrightnessLevel: {
    //brightness level percentage of the luminaire
    type: Number,
    required: [true, "A street light must have a brightness level."],
  },
  isPoweredOn: {
    //current operational state
    type: Boolean,
    default: "off",
  },
});

//creating a model for ControlProfile collection
const ControlProfile = mongoose.model("ControlProfile", controlProfileSchema);
module.exports = ControlProfile;
