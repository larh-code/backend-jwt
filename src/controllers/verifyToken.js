const config = require('../config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    return res.status(401).json({
      success: false,
      message: 'no tiene acceso, token no existe'
    })
  }
  const decode = jwt.verify(token, config.secret);
  req.userId = decode.id;
  next();
}

module.exports = verifyToken;