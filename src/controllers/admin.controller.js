import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Add a new product
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const newProduct = new Product({ name, description, price, category, stock });
  await newProduct.save();
  res
    .status(201)
    .json({ success: true, message: "Product added successfully" });
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!updatedProduct) throw new ApiError(404, "Product not found");
  res.json(updatedProduct);
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) throw new ApiError(404, "Product not found");
  res.json({ success: true, message: "Product deleted successfully" });
});

// View all products
const viewAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// View products by category
const viewProductByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
});

// View all orders
const viewOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "username email");
  res.json(orders);
});

// View order details
const viewOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "username email");
  if (!order) throw new ApiError(404, "Order not found");
  res.json(order);
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updatedOrder) throw new ApiError(404, "Order not found");
  res.json(updatedOrder);
});

// View all users
const viewUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// View user details
const viewUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new ApiError(404, "User not found");
  res.json({ success: true, message: "User deleted successfully" });
});

// View all product reviews
const viewProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate("product", "name");
  res.json(reviews);
});

// View a specific product review
const viewProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id).populate("product", "name");
  if (!review) throw new ApiError(404, "Review not found");
  res.json(review);
});

// Add a product review
const addProductReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const newReview = new Review({ product: productId, rating, comment });
  await newReview.save();
  res.status(201).json({ success: true, message: "Review added successfully" });
});

// Delete a product review
const deleteProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) throw new ApiError(404, "Review not found");
  res.json({ success: true, message: "Review deleted successfully" });
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  viewOrders,
  viewOrderDetails,
  updateOrderStatus,
  viewUsers,
  viewUserDetails,
  deleteUser,
  viewProductByCategory,
  viewAllProducts,
  viewProductReviews,
  viewProductReview,
  addProductReview,
  deleteProductReview,
};
