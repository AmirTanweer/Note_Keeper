const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User=require('../models/Auth')
dotenv.config();

const Authentication = async (req, res, next) => {
  try {
    // Get token from headers (should be in Authorization header)
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Access denied: Invalid token' });
    }

    //Check if user is present in database or not
    let user=await User.findById(decoded.id)
    if(!user){
        return res.status(401).json({message:'Access Denied : No User Found'})
    }

    // Attach user ID to request object
    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Token verification failed' });
  }
};

module.exports = Authentication;
