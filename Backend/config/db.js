import mongoose from "mongoose";
import colors from "colors";
const url = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/ecom");

    // const conn = await mongoose.connect(url);
    console.log(`Connected to MongoDB database ${conn.connection.host}`.red);
  } catch (error) {
    console.log(`error in connection ${error}`.red.bgWhite);
  }
};

export default connectDB;
