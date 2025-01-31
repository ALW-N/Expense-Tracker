const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION } // Example: "1d"
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRATION } // Example: "7d"
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
