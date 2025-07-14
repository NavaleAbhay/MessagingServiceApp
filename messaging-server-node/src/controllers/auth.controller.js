const { register, verify, validateLogin } = require('../services/user.service');
const { generateToken } = require('../helpers/jwt.helper');
const { otpCode } = require('../config');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (register(username, password)) {
    return res.json({ message: 'Registered' });
  }
  return res.status(409).json({ error: 'User already exists' });
};

const verifyUser = (req, res) => {
  const { username, otp } = req.body;
  if (verify(username, otp, otpCode)) {
    return res.json({ message: 'Verified' });
  }
  return res.status(400).json({ error: 'Invalid OTP or user' });
};


const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!validateLogin(username, password))
    return res.status(401).send('Unauthorized');

  const token = generateToken(username);
  res.json({ "data" : token });
};

module.exports = { registerUser, verifyUser, loginUser };