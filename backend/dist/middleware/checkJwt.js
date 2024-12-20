"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const checkJwt = (req, res, next) => {
    // For now, we'll create a mock middleware that always allows access
    // In a real application, this would verify the JWT token
    console.log('JWT middleware called (mock implementation)');
    next();
    // Uncomment and modify the following for actual JWT verification:
    /*
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
    */
};
exports.checkJwt = checkJwt;
