import express from "express";
import * as registerController from "../Controller/registerController.js";
import { isAdmin, requireSignIn } from "./Middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", registerController.save);
router.post("/login", registerController.login);

router.get("/test", requireSignIn, isAdmin, registerController.test);
export default router;
