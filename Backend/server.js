import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/AuthRoute.js";
dotenv.config();
const app = express();

//database Config
connectDB();

//middleware
app.use(express.json()); //place of bodyParser
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
//rest api

app.get("/", (req, res) => {
  //   res.send({
  //     message: "welcome to ecom",
  //   });

  res.send("<h1>welcome to ecom</h1>");
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE}  mode on ${port} `.blue
  );
});
