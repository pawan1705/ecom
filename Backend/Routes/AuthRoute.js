import express from "express";
import * as registerController from "../Controller/registerController.js";
import { isAdmin, requireSignIn } from "./Middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", registerController.save);
router.post("/login", registerController.login);

router.get("/test", requireSignIn, isAdmin, registerController.test);

//protected Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// router.get("/user-auth", requireSignIn, registerController.protect);
export default router;
