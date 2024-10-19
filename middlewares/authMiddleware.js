const { verifyToken } = require('../config/jwtConfig');

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateJWT;
