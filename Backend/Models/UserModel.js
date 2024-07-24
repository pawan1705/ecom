import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      maxLength: 10,
      minLength: 10,
      lowercase: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
const UserSchemaModel = mongoose.model("registration", userSchema);

export default UserSchemaModel;
