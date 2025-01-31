require("dotenv").config(); // Load environment variables
const connectDB = require("./config/db");
const app = require("./app"); // Import the app

const PORT = process.env.PORT || 5000;

// Start the server and connect to the database
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
