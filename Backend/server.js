import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/AuthRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js";
import ProductRoute from "./Routes/ProductRoute.js";
// import formidableMiddleware from "express-formidable";
import cors from "cors";
dotenv.config();
const app = express();

//database Config
connectDB();

//middleware
app.use(cors());
app.use(express.json()); //place of bodyParser
app.use(morgan("dev"));
// app.use(formidableMiddleware());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
//rest api

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE}  mode on ${port} `.blue
  );
});
