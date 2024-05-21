import express from "express";
const router = express.Router();
import {
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
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authentication.js";

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/profile/password", verifyToken, changePassword);

// Cart routes
router.post("/cart/new", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.delete("/cart/:itemId", verifyToken, deleteFromCart);

// Product routes
router.get("/products", verifyToken, getProducts);
router.get("/products/:category", verifyToken, getProductsByCategory);
router.get("/product/:productId", verifyToken, getProductById);

// Order routes
router.post("/order/new", verifyToken, placeOrder);
router.get("/orders", verifyToken, getOrders);
router.get("/order/:orderId", verifyToken, getOrderById);

// Loved routes
router.post("/loved/add", verifyToken, addToLoved);
router.get("/loved", verifyToken, getLoved);
router.delete("/loved/:itemId", verifyToken, deleteFromLoved);

// Tags routes
router.get("/tags", verifyToken, getAllTags);
router.get("/tag/:tagId/products", verifyToken, getProductsByTag);

export { router as userRouter };
