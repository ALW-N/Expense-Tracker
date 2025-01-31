const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const insightsRoutes = require("./routes/insightsRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes); // Make sure this path is correct
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/insights", insightsRoutes);

module.exports = app; // Export the app for use in server.js
