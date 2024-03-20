const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Token not provided" });
  
  try {
    const decoded = jwt.verify(token,"Alipa");
    if (!decoded.isAdmin) return res.status(403).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { adminMiddleware };
