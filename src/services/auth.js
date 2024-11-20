const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'your_secret_key_here'; // Store this securely, e.g., in environment variables

function generateToken(user) {
  // Define the payload, excluding sensitive information like the password
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneno: user.phoneno,
    role: user.role,
  };

  // Generate the token with an expiry time
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = { generateToken };
