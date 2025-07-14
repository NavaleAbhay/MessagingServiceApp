const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (username) =>
  jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

const verifyToken = (token) =>
  jwt.verify(token, jwtSecret);

module.exports = { generateToken, verifyToken };