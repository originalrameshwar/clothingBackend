import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    items:{
        type: Array,
        required: true,
        default: []
    },
    total_price:{
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);

