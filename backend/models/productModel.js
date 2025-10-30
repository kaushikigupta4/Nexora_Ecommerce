const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: Number,
  count: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true }, // id from Fake Store API
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: ratingSchema
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
