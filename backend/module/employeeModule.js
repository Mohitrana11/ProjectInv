const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"]
  },
  mobile: {
    type: String,
    required: [true, "Please Enter Your Mobile Number"],
    maxLength: [10, "Mobile number cannot exceed 10 characters"],
    minLength: [10, "Mobile number should have 10 characters"],
    unique: true
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
  },
  avatar: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  course: [{
    type: String,
    enum: ['MCA', 'BCA', 'BSC'],
    required: true,
  }],
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
