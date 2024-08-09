import express from "express";
import * as categoryController from "../Controller/categoryController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  categoryController.createCategory
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.updateCategory
);

//get aLL
router.get("/get-category", categoryController.getCategory);

//category by id
router.get("/get-single-category/:id", categoryController.getSingleCategory);

//delete
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.deleteCategory
);

export default router;
