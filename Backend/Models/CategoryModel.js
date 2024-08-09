import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(uniqueValidator);
const CategorySchemaModel = mongoose.model("category", categorySchema);

export default CategorySchemaModel;
