const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Define the schema for the User model
const signupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneno: { type: String },
  role: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
});

// Hash the password before saving the user document
signupSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // Handle errors
  }
});

// Create and export the model
const User = mongoose.model('User', signupSchema, 'signup');

module.exports = User; 