import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    items: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      required: true,
      default: [],
    },
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
