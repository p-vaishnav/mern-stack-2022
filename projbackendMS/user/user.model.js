const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');

// ----------SCHEMA-------------------
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [40, 'Name should have characters less than 40']
    },

    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        validate: [validator.isEmail, 'Please enter email in a correct format'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: [6, 'length of password should be more than 6 char'],
        // quite usefull when fetching a user in memory password should not come, if programmer wants it mention it explicitly
        select: false
    },

    role: {
        type: String,
        default: 'user'
    },

    photo: {
        id: {
            type: String,
            required: true
        },

        secure_url: {
            type: String,
            required: true
        }
    },

    forgotPasswordToken: String,

    forgotPasswordExpiry: Date,

    createdAt: {
        type: Date,
        // TODO: huh problem, calling the function here only, check interms of testing what is stored in DB
        default: Date.now()
    }
});

//-----------METHODS------------------------------------------

// encrypt the password before saving into the DB!!
userSchema.pre('save', async function(next) {
    // while saving any document if and only if password field is modified then only encrypt the password
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// validating the password
userSchema.methods.isValidatedPassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

// creating a jwt token
userSchema.methods.createJwtToken = function() {
    return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

// TODO: generate forgot password feature will be implemented in future

// TODO: what this mongoose.Model does??
module.exports = mongoose.model('User', userSchema);