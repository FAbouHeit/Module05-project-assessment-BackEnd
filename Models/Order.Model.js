import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    selected_products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    user_ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status:{
        type: String,
        required: true,
        enum: ["Approved", "Rejected", "Pending"],
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;


