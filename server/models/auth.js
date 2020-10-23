const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ROLES, MEMBER } = require('../configuration/roles')
// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local'],
    required: true
  },
  name: String,
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  role: {
    type: String,
    required: true,
    default: MEMBER,
    enum: ROLES
  }
});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;