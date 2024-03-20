const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Token not provided" });
  
  try {
    const decoded = jwt.verify(token,"masai");
    req.user = decoded;
    // console.log(token)
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.log(req.user)
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
