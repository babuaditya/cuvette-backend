const jwt = require('jsonwebtoken');

// Generate access token (short-lived token)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.companyEmail },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Token valid for 15 minutes
  );
};

// Generate refresh token (long-lived token)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.companyEmail },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token valid for 7 days
  );
};

// Verify token (middleware can use this)
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
