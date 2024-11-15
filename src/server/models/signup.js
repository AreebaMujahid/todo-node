const mongoose = require('mongoose');

// Define the schema for the User model
const signupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneno: { type: String },
  role: { type: String, required: true },
});

// Create and export the model
const User = mongoose.model('User', signupSchema, 'signup');


module.exports = User;
