const express = require("express");
const { register, login, logout, refreshToken } = require("../controllers/authController");

const router = express.Router();

// Define routes for authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

module.exports = router; // Export the router
