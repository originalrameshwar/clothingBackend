import express from "express";
import cookieParser from "cookie-parser";
import router from "../routes/index.routes.js";

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/", router);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

export default app;