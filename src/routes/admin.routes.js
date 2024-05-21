import express from "express";
const router = express.Router();
import { authorizeAdmin } from "../middleware/authentication.js";
import {
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
} from "../controllers/admin.controller.js";

// Route requiring admin authorization
router.get("/", authorizeAdmin, (req, res) => {
  res.send("<h1>This is the admin page</h1>");
});

// Product routes
router.post("/product/new", authorizeAdmin, addProduct);
router.put("/product/:id", authorizeAdmin, updateProduct);
router.delete("/product/:id", authorizeAdmin, deleteProduct);
router.get("/products", authorizeAdmin, viewAllProducts);
router.get("/products/:category", authorizeAdmin, viewProductByCategory);

// Order routes
router.get("/orders", authorizeAdmin, viewOrders);
router.get("/orders/:id", authorizeAdmin, viewOrderDetails);
router.put("/orders/:id", authorizeAdmin, updateOrderStatus);

// User routes
router.get("/users", authorizeAdmin, viewUsers);
router.get("/user/:id", authorizeAdmin, viewUserDetails);
router.delete("/user/:id", authorizeAdmin, deleteUser);

// Product review routes
router.get("/products/reviews", authorizeAdmin, viewProductReviews);
router.get("/products/reviews/:id", authorizeAdmin, viewProductReview);
router.post("/products/reviews/:productId", authorizeAdmin, addProductReview);
router.delete("/products/reviews/:id", authorizeAdmin, deleteProductReview);

export { router as adminRouter };
