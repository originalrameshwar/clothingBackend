import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/config/app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
