const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1'); // it is generated via mac address and time stamp of PC
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
    required: true,
  },

  lastname: {
    type: String,
    // required: true,
    maxlength: 32,
    trim: true,
    // required: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  // TODO: come back here
  encry_password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
  },

  role: {
    type: Number,
    default: 0,
  },

  purchases: {
    type: Array,
    default: [],
  },
});

userSchema.virtual('password')
.set(function(password) {
  this._password = password;
  // uuidv1 is a combination of mac address && time stamp
  this.salt = uuidv1();
  this.encry_password = this.securePassword(password);
})
.get(function() {
   return this._password;
});

userSchema.methods = {
  authenticate: function(password) {
    return this.securePassword(password) === this.encry_password;
  },
  securePassword: function(plainPassword) {
    if (!plainPassword) {
      return '';
    }

    try { 
      // this.salt is the secret
      return crypto.createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
}

module.exports = mongoose.model('User', userSchema);