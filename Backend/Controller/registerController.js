import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import UserSchemaModel from "../Models/UserModel.js";
import JWT from "jsonwebtoken";
export const save = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check  user
    const existingUser = await UserSchemaModel.findOne({ email });
    //check existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
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
