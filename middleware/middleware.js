const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {

const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. Token missing or malformed.' });
}

const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
console.log(token);
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, '4d2ca3f62175d126d49cf3eeed47d7e5');
//  req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;