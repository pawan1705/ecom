import express from "express";
import * as productController from "../Controller/productController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.createProduct
);

router.get("/get-products", productController.getProducts);
router.get("/get-single-product/:slug", productController.getSingleProducts);
router.get("/get-product-image/:pid", productController.getProductImage);
router.delete("/delete-product/:pid", productController.deleteProduct);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.updateProduct
);
export default router;
