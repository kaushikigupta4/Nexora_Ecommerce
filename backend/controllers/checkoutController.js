exports.checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.qty, 0);
    res.json({
      message: "Mock Checkout Successful",
      receipt: {
        total,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};
