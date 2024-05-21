import express from "express";
import { adminRouter } from "./admin.routes.js";
import { userRouter } from "./users.routes.js";

const router = express.Router();

// all admin routes
router.use("/admin", adminRouter);

// all user routes
router.use("/users", userRouter);

export default router;
