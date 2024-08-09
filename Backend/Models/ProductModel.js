import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(uniqueValidator);

const ProductSchemaModel = mongoose.model("products", ProductSchema);

export default ProductSchemaModel;
