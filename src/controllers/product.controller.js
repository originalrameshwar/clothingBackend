import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// req.body.product : object path = /products/add POST request
export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, image_urls, tags } =
    req.body.product;

  if (!req.body.product) {
    throw new ApiError(404, "Please!! provide all fields");
  }
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image_urls,
    tags,
  });

  await newProduct.save();
  res
    .status(201)
    .json({ success: true, message: "Product added successfully" });
});

// req.body.productId : string, path = '/products/:id'
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res.json(product);
});

// req.body.productId : string, req.body.product : object, path = /products/:id/update PUT request
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  const { name, description, price, category, image_urls, tags } =
    req.body.product;

  if (productId && req.body.product) {
    throw new ApiError(404, "Product not found");
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    image_urls,
    tags,
  });
  await Product.findByIdAndUpdate(productId, product);
  res
    .status(200)
    .json({ success: true, message: "Product updated successfully" });
});

// req.body.productId : string path = "/products/:id/delete, DELETE request
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  if (!productId) {
    throw new ApiError(404, "Product not found!!");
  }
  await Product.findByIdAndDelete(productId);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});




// get all products details
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// get products by category req.body.category ; string enum:[men, women, children] path = products/:slug
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.body.category;
  if (!category) {
    throw new ApiError(404, "Invalid category");
  }
  const products = await Product.find({ category });
  res.json(products);
});
