const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    role:{
        type: 'string',
        required:true
    },
    username:{
        type:'string',
        required: [true,'please enter a username'],
        unique: true,
        lowercase: true,
        minlength: [5,'please enter username at least 5 characters'],
    },
    email:{ 
        type: 'string',
        required: [true,'please enter an email'], 
        unique: true,
        lowercase: true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type: 'string',
        required: [true,'please enter an password'],
        minlength: [6,'please enter at least six characters of your password'],
    },
    isActive:{
        type:'boolean',
        required: true
    },
    image:{
        type: 'string',

    },
    otp:{
        type: 'string',
    },
    createAt:{
        type:Date
    },
    resetPasswordToken:{
        type: 'string',
    },
    isOtpSend:{
        type: 'boolean',
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;