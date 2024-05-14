import { User } from "./models/user";
import { Product } from "./models/product";
import { Order } from "./models/order";
import { Review } from "./models/review";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// POST:admin/addProduct req.body.product
export const addProduct = asyncHandler(async (req, res) => {
  console.log("addProduct");
  try {
    const { name, description, price, category, image_urls, tags } =
      req.body.product;

    if (!name && !description && !price && !category && !image_urls && !tags) {
      throw new ApiError(404, "Please!! provide all fields");
    }

    // Create new product
    const product = new Product({
      name,
      description,
      price,
      category,
      image_urls,
      tags,
    });

    // Save product to database
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
});

// DELETE:admin/product/:id/delete req.body.productId
export const deleteProduct = asyncHandler(async (req, res) => {
  console.log("deleteProduct");

  try {
    const productId = req.body.productId;
    if (!productId) {
      throw new ApiError(404, "Product not found!!");
    }

    // Find product by ID and delete
    await Product.findByIdAndDelete(productId);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
});
// GET admin/orders
export const viewOrders = asyncHandler(async (req, res) => {
  console.log("viewOrders");

  try {
    // Fetch all orders from database
    const orders = await Order.find();

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error viewing orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET admin/users req.body.userId
export const viewUsers = asyncHandler(async (req, res) => {
  console.log("viewUsers");
  try {
    const users = await User.find({});

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error viewing user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET admin/user/:id req.body.userId
export const viewUserDetails = asyncHandler(async (req, res) => {
  console.log("viewUserDetails");
  try {
    const userId = req.body.userId;
    if (!userId) {
      throw new ApiError(404, "Provid user id");
    }

    // Fetch user details from database
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error viewing user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET admin/products/:category req.body.category
export const viewProductbyCategory = asyncHandler(async (req, res) => {
  console.log("viewProductbyCategory");
  try {
    const category = await req.body.category;
    if (!category) {
      throw new ApiError(404, "Invalid category");
    }
    const products = await Product.find({ category: category });
    if (!products) {
      throw new ApiError(404, "No products found");
    }
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error viewing products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET admin/products/reviews
export const viewproductsReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({});
    if (!reviews) {
      throw new ApiError(404, "No reviews found");
    }

    res.json({ success: true, Review });
  } catch (error) {
    console.error("Error viewing product review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET admin/products/reviews/:id req.body.review_id
export const viewproductReview = asyncHandler(async (req, res) => {
  try {
    const review_id = req.body.review_id;

    const review = await Review.findById(review_id);
    if (!review) {
      throw new ApiError(404, "Review not found");
    }
    res.json({ success: true, review });
  } catch (error) {
    console.error("Error viewing product review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
