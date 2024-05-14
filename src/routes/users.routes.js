import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyToken, authorizeUser } from "../middleware/authentication.js";

router.get('/', (req, res) => {
  console.log("hello world");
  res.send("Hello World! from userRouter");
})
// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting user profile
router.get("/:id",verifyToken, getUserProfile);

export { router as userRouter };
