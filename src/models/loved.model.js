import mongoose, { Schema } from "mongoose";

const lovedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Loved = mongoose.model("Loved", lovedSchema);
