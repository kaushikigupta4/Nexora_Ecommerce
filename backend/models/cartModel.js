const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Number, required: true },
  title: String,
  price: Number,
  qty: { type: Number, default: 1 },
  image: String
}, { timestamps: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
