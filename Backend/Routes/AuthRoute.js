import express from "express";
import * as registerController from "../Controller/registerController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", registerController.save);
router.post("/login", registerController.login);

router.get("/test", requireSignIn, isAdmin, registerController.test);

//protected Route
//user Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// router.get("/user-auth", requireSignIn, registerController.protect);

//forget password

router.post("/change-password", registerController.forgotPassword);

//update profile
router.put("/profile", requireSignIn, registerController.updateProfile);

router.get("/orders", requireSignIn, registerController.getOrder);
router.get(
  "/all-orders",
  requireSignIn,
  isAdmin,
  registerController.getAllOrder
);
export default router;
