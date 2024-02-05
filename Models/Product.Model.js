import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Price must be a positive number",
      },
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    slug:{
      type : String,
      required:true
    },
    images: [{
        type: String,
        required: true,
      }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;


