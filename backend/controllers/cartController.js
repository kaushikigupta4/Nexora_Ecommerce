const CartItem = require("../models/cartModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");


const calcTotal = (items) => items.reduce((s, it) => s + it.price * it.qty, 0);


exports.getCart = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId query required" });

    const items = await CartItem.find({ user: userId }).lean();
    const total = calcTotal(items);
    res.json({ items, total });
  } catch (err) {
    console.error("cartController.getCart:", err.message);
    next(err);
  }
};


exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId, qty = 1 } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: "userId and productId required" });

    // find product details
    const product = await Product.findOne({ productId: productId }).lean();
    const title = product ? product.title : `Product ${productId}`;
    const price = product ? product.price : 0;
    const image = product ? product.image : "";

    // If same product exists for user, increment qty
    let item = await CartItem.findOne({ user: userId, productId: productId });
    if (item) {
      item.qty += qty;
      await item.save();
    } else {
      item = await CartItem.create({ user: userId, productId, title, price, qty, image, user: userId });
    }

    const items = await CartItem.find({ user: userId }).lean();
    const total = calcTotal(items);
    res.status(201).json({ items, total });
  } catch (err) {
    console.error("cartController.addToCart:", err.message);
    next(err);
  }
};


exports.removeFromCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "invalid cart item id" });

    const removed = await CartItem.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "cart item not found" });

    const items = await CartItem.find({ user: removed.user }).lean();
    const total = calcTotal(items);
    res.json({ items, total });
  } catch (err) {
    console.error("cartController.removeFromCart:", err.message);
    next(err);
  }
};


exports.updateQty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "invalid cart item id" });
    if (!Number.isInteger(qty) || qty < 1) return res.status(400).json({ message: "qty must be >=1" });

    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ message: "cart item not found" });

    item.qty = qty;
    await item.save();

    const items = await CartItem.find({ user: item.user }).lean();
    const total = calcTotal(items);
    res.json({ items, total });
  } catch (err) {
    console.error("cartController.updateQty:", err.message);
    next(err);
  }
};
