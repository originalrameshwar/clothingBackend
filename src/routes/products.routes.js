import express from "express";
const router = express.Router();
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
} from "../controllers/product.controller.js";

// req.body.product : object path = /products/add POST request

router.get("/",getProducts); // TODO: verify Admin here 

router.post('/add',addProduct); // TODO: verify Admin here

router.put('/:id',getProductById) // TODO: verify Admin here

router.put('/:id/update',updateProduct) // TODO: verify Admin here

router.delete('/:id/delete',deleteProduct) // TODO: verify Admin here

router.get('/category/:category',getProductsByCategory) // TODO: verify Admin here

export { router as productRouter };
