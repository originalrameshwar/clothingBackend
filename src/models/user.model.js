import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minlength: 6,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Corrected spelling
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
      required: true,
    },
    address: {
      type: String,
      trim: true,
      index: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    loved: {
      type: Schema.Types.ObjectId,
      ref: "Loved",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
