import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// handle user registration
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password, email, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    name,
  });

  // Save the new user to the database
  await newUser.save();

  // Respond with success message
  console.log({ success: true, message: "User registered successfully" });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

// handle user login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("login user " + req.body);

  // Find user by username or email
  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password); // is that line right? becase when we register user when we use salt   const salt = await bcrypt.genSalt(10); like this give me ans

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Respond with token
  // setting cookies token to browser
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  console.log({ success: true, token });
  res.json({ success: true, token });
});
// get the User profile
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("getting user profile " + req.body.userId);
  const userId = req.body.userId; // Assuming userId is attached to request by authentication middleware
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  console.log(user);
  res.json(user);
});

export { registerUser, loginUser, getUserProfile };
