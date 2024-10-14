const mongoose = require('mongoose');

//collection StreetLight schema
const streetLightSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: [true, 'A streetlight must have a status'],
            enum: {
              values: ['on', 'off', 'malfunctioning'],
              message: 'Status is either: on, off, or malfunctioning'
            }
        },
        brightnessLevel: {
            type: Number,
            required: [true, 'A streetlight must have a brightness level'],
            min: [0, 'Brightness level must be at least 0'],
            max: [100, 'Brightness level must be at most 100'],
        },
        location: {
            type: {
            type: String,
            default: 'Point', // most common GeoJSON type for single locations
            enum: ['Point'] // Ensures that the type is always 'Point'
            },
            coordinates: {
            type: [Number], // Longitude first, then latitude
            required: [true, 'A tour must have coordinates (longitude, latitude)']
            },
            address: {
            type:String
            }    
        }
    }
);

streetLightSchema.index({ location: '2dsphere' });   // 2dsphere index to enable geospatial queries

const StreetLight= mongoose.model('StreetLight',streetLightSchema);
module.exports = StreetLight;