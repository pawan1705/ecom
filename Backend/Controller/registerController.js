import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import UserSchemaModel from "../Models/UserModel.js";
import JWT from "jsonwebtoken";
export const save = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    //check  user
    const existingUser = await UserSchemaModel.findOne({ email });
    //check existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login!!",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new UserSchemaModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await UserSchemaModel.findOne({ email });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "Error in Login",
      });
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const test = (req, res) => {
  res.send("protected Route");
};

export const protect = (req, res) => {
  res.send("Ok");
  res.status(200).send({
    ok: true,
  });
};
