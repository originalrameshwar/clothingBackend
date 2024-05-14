import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },
    shipping_address: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const Order = mongoose.model("Order", orderSchema)

