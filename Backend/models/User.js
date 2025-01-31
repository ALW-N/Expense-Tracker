const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
// Compare passwords
UserSchema.methods.comparePassword = async function(password) {
  console.log('Comparing Password:', password);  // Log the incoming password
  console.log('Hashed Password:', this.password);  // Log the stored hashed password
  return bcrypt.compare(password, this.password);
};


// Compare passwords
UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);  // Ensure this returns a Promise
};

module.exports = mongoose.model("User", UserSchema);
