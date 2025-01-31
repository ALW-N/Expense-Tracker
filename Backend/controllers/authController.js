const jwt = require("jsonwebtoken");  // Add this import
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../config/jwt");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login Request:', req.body);  // Log the incoming request for debugging

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Log the hashed password stored in the database
    console.log('Stored hashed password:', user.password);

    // Compare passwords using the model's method
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch); // Log the result of the password comparison

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in a secure cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Ensure secure cookie handling
      sameSite: "strict",
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Login Error:', error); // Log the error for debugging
    res.status(500).json({ message: "Server Error", error });
  }
};


// LOGOUT USER
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

// REFRESH TOKEN
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ message: "Access denied" });

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken({ _id: user.id });
    res.json({ accessToken: newAccessToken });
  });
};
