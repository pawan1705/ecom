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

//filter product
router.post("/product-filters", productController.filterProduct);

//product Count
router.get("/product-count", productController.productCount);
router.get("/product-list/:page", productController.productList);

//search product
router.get("/search/:keyword", productController.searchProduct);

//similar product
router.get("/similar-product/:pid/:cid", productController.similarProduct);

//category wise product route
router.get("/product-category/:slug", productController.productCategorySingle);

//payment route
//token-braintree
router.get("/braintree-token", productController.braintreeToken);

router.post(
  "/braintree-payment",
  requireSignIn,
  productController.braintreePayment
);

export default router;
