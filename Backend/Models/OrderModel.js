import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "registration",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "cancel"],
    },
  },
  { timestamps: true }
);

const OrderSchemaModel = mongoose.model("order", orderSchema);

export default OrderSchemaModel;
