const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z ]{2,30}$/, 
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, 
  },
  companyName: {
    type: String,
    required: true,
    maxlength: 30, 
  },
  companyEmail: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Invalid email address'], 
  },
  employeeSize: {
    type: Number,
    required: true,
  },
  emailOtp: String,
  phoneOtp:String,
  otpExpiry: Date,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('User', userSchema);
