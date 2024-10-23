const mongoose = require("mongoose");

//collection StreetLight schema
const streetLightSchema = new mongoose.Schema({
  status: {
    //current operational state
    type: String,
    enum: {
      values: ["functioning", "malfunctioning"],
      message: "Status is either: functioning or malfunctioning",
    },
    default: "functioning",
  },
  location: {
    type: {
      type: String,
      default: "Point", // most common GeoJSON type for single locations
      enum: ["Point"], // Ensures that the type is always 'Point'
    },
    coordinates: {
      type: [Number], // Longitude first, then latitude
      required: [true, "A tour must have coordinates (longitude, latitude)"],
    },
    address: {
      type: String,
    },
  },
  ApplyZoneSetting: {
    type: Boolean,
    default: false,
  },
  ApplyProfileSetting: {
    type: String,
    default: false,
  },
  BrightnessLevel: {
    //direct brightness level percentage of the luminaire
    type: Number,
    required: [true, "A street light must have a brightness level."],
  },
  isPoweredOn: {
    //current operational state
    type: Boolean,
    default: "off",
  },
});
streetLightSchema.index({ location: "2dsphere" }); // 2dsphere index to enable geospatial queries

//creating a model for ControlNode collection
const StreetLight = mongoose.model("StreetLight", streetLightSchema);
module.exports = StreetLight;
