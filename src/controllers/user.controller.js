import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// handle user registration
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, name, address, phone_number } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    name,
    address,
    phone_number,
  });

  await newUser.save();

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

// handle user login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ success: true, token });
});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { email, name, address, phone_number } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { email, name, address, phone_number },
    { new: true }
  );
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, user });
});

// change password
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid old password");

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedNewPassword;
  await user.save();

  res.json({ success: true, message: "Password changed successfully" });
});

// add to cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const newCart = new Cart({
      user: userId,
      items: [{ productId, quantity }],
    });
    await newCart.save();
    res.status(201).json({ success: true, cart: newCart });
  } else {
    cart.items.push({ productId, quantity });
    await cart.save();
    res.status(200).json({ success: true, cart });
  }
});

// get cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const cart = await Cart.findOne({ user: userId }).populate("items.productId");
  if (!cart) throw new ApiError(404, "Cart not found");
  res.json(cart);
});

// delete from cart
const deleteFromCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();
  res.json({ success: true, cart });
});

// get products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// get products by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
});

// get product by id
const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");
  res.json(product);
});

// place order
const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { items, total } = req.body;
  const newOrder = new Order({ user: userId, items, total });
  await newOrder.save();
  res.status(201).json({ success: true, order: newOrder });
});

// get orders
const getOrders = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const orders = await Order.find({ user: userId });
  res.json(orders);
});

// get order by id
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");
  res.json(order);
});

// add to loved
const addToLoved = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (!user.loved) {
    user.loved = [productId];
  } else {
    user.loved.push(productId);
  }
  await user.save();
  res.status(200).json({ success: true, loved: user.loved });
});

// get loved items
const getLoved = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate("loved");
  if (!user) throw new ApiError(404, "User not found");
  res.json(user.loved);
});

// delete from loved
const deleteFromLoved = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { itemId } = req.params;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.loved = user.loved.filter((item) => item.toString() !== itemId);
  await user.save();
  res.json({ success: true, loved: user.loved });
});

// get all tags
const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

// get products by tag
const getProductsByTag = asyncHandler(async (req, res) => {
  const { tagId } = req.params;
  const products = await Product.find({ tags: tagId });
  res.json(products);
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  addToCart,
  getCart,
  deleteFromCart,
  getProducts,
  getProductsByCategory,
  getProductById,
  placeOrder,
  getOrders,
  getOrderById,
  addToLoved,
  getLoved,
  deleteFromLoved,
  getAllTags,
  getProductsByTag,
};
