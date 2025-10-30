const User = require("../models/userModel");


exports.login = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "name and email required" });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name, email });

    res.json(user);
  } catch (err) {
    console.error("userController.login:", err.message);
    next(err);
  }
};
