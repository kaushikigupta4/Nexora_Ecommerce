const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favorites: [{ type: Number }], // product IDs
});

module.exports = mongoose.model("User", userSchema);
