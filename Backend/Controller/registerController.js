import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import UserSchemaModel from "../Models/UserModel.js";
import OrderSchemaModel from "../Models/OrderModel.js";
import JWT from "jsonwebtoken";
export const save = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
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
    if (!answer) {
      return res.send({ message: "Answer is required" });
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
      answer,
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
        answer: user.answer,
        role: user.role,
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

export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await UserSchemaModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await UserSchemaModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const user = await UserSchemaModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserSchemaModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while updating user profile",
      error,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await OrderSchemaModel.find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching orders",
      error,
    });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderSchemaModel.find({})
      .populate("products", "-image")
      .populate("buyer", "name");

    res.json(orders).sort({ createdAt: "-1" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching orders",
      error,
    });
  }
};
