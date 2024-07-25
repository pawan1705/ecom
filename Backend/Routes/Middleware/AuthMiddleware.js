import JWT from "jsonwebtoken";
import UserSchemaModel from "../../Models/UserModel.js";

//protected Routes Token

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserSchemaModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorization Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
