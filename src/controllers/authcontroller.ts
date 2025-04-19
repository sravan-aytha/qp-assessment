import UserService from "services/user-service";

const jwt = require('jsonwebtoken');

// Use strong secret in production (env variable recommended)
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
const JWT_EXPIRY = '1d'; // You can tweak as needed
const JWT_ALGORITHM = 'HS512'; // Stronger algorithm

class AuthController {

  /**
   * Encode payload (userId, role) into a JWT
   * @param {Object} payload - { userId, role, email (optional), name (optional) }
   */
  async encode(payload:any) {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: JWT_ALGORITHM,
      expiresIn: JWT_EXPIRY,
    });
  }

  /**
   * Middleware to decode JWT and attach user info to req.user
   * Typical production pattern for embedding auth data
   */
  async decode(req:any, res:any, next:any) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
      
      const decoded = jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });
      req.user = decoded; // Embed decoded payload in request (standard practice)
      next();
    } catch (error:any) {
      console.log(error,"error")
      return res.status(401).json({ message: 'Invalid or expired token,please login again', error: error.message });
    }
  }

  /**
   * Manually verify a token (e.g., in services)
   * Returns decoded data or throws error
   */
  async verify(token:string) {
    return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });
  }
}

export default AuthController