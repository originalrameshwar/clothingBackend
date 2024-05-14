import express from 'express';
const app = express();
import connectDB from './src/config/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { adminRouter } from './src/routes/admin.routes.js'
import { userRouter } from './src/routes/users.routes.js';
import { productRouter } from './src/routes/products.routes.js';

dotenv.config()
connectDB()

app.use(cookieParser()); 
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use('/', userRouter );
app.use('/admin',adminRouter);
app.use('/products', productRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
