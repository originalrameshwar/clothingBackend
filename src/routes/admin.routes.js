import express from "express";
const router = express.Router();
import { authorizeAdmin } from "../middleware/authentication.js";
import {
  addProduct,
  deleteProduct,
  viewOrders,
  viewUsers,
  viewUserDetails,
  viewProductbyCategory,
  viewproductsReviews,
  viewproductReview
} from "../controllers/admin.controller.js";

// Route requiring admin authorization
router.get("/", authorizeAdmin, (req, res) => {
  res.send("<h1>This is admin page</h1>");
});

router.post('/product/new', addProduct);

router.get('/products/:category', viewProductbyCategory);

router.delete('/product/delete', deleteProduct);

router.get('/orders', viewOrders);

router.get('/users', viewUsers);

router.get('/user/:id', viewUserDetails);

router.get('/products/review', viewproductsReviews);

router.get('/products/review/:id', viewproductReview);

export { router as adminRouter };
