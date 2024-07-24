import express from "express";
import * as registerController from "../Controller/registerController.js";
const router = express.Router();

router.post("/register", registerController.save);
router.post("/login", registerController.login);
export default router;
