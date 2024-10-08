const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const secretKey = crypto.randomBytes(32).toString('hex')

const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    secretKey,
    { expiresIn: "2s" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    secretKey
  );
};

module.exports = { generateAccessToken, generateRefreshToken, secretKey };
