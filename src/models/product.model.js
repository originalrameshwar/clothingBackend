import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['men', 'women', 'children']
    },
    image_urls: {
      type: [String],
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);


export const Product = mongoose.model("Product", productSchema);