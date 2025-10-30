const axios = require("axios");
const Product = require("../models/productModel");


// Returns cached products from DB; if none, fetch from FakeStore and cache.
exports.getProducts = async (req, res, next) => {
  try {
    const cached = await Product.find().limit(50).lean();
    if (cached && cached.length > 0) {
      return res.json(cached);
    }

    const { data } = await axios.get("https://fakestoreapi.com/products?limit=10");
    if (Array.isArray(data)) {
    
      const toInsert = data.map(p => ({
        productId: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        rating: p.rating
      }));

      await Product.insertMany(toInsert);
      const saved = await Product.find().lean();
      return res.json(saved);
    }

    res.json([]);
  } catch (err) {
    console.error("productController.getProducts:", err.message);
    next(err);
  }
};
