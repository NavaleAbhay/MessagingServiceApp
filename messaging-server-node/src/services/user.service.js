const User = require('../models/user.model');
const users = new Map();

const register = (username, password) => {
  if (users.has(username)) return false;
  users.set(username, new User(username, password));
  return true;
};

const verify = (username, otp, otpCode) => {
  const user = users.get(username);
  if (!user || otp !== otpCode) return false;
  user.verified = true;
  return true;
};

const validateLogin = (username, password) => {
  const user = users.get(username);
  return user && user.verified && user.password === password;
};

module.exports = { register, verify, validateLogin };