const mongoose = require('mongoose');

//collection Admin schema
const adminSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'An admin must have a username.'],
        unique: true,
        trim: true,
        minlength: [4, 'An admin name must have more or equal then 4 characters']
        },
      password: {
        type: String,
        required: [true, 'An admin must have a password'],
        select: false, // to not be included in queries
        validate: {
            validator: function(val) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val);  // minimum 8 characters, 1 uppercase, 1 lowercase, 1 number
            },
            message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
        }
      },
      email: {
        type: String,
        required: [true, 'An admin must have an email.'],
        unique: true,
        lowercase: true, // to prevent duplicate emails
        trim: true, 
        validate: {
          validator: function (val) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val); // to validate the email format
          },
          message: 'Please provide a valid email'
        }
      }
    }
);

const Admin= mongoose.model('Admin',adminSchema);
module.exports = Admin;
