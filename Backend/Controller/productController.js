import ProductSchemaModel from "../Models/ProductModel.js";
import CategorySchemaModel from "../Models/CategoryModel.js";
import fs from "fs";
import dotenv from "dotenv";
import slugify from "slugify";
import braintree from "braintree";
import OrderSchemaModel from "../Models/OrderModel.js";
dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !image && image.size > 10000:
        return res
          .status(500)
          .send({ error: "image is required and should be less than 1MB" });
    }

    const products = new ProductSchemaModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Creating Product",
      error,
    });
  }
};

//get all products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductSchemaModel.find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      totalCount: products.length,
      success: true,
      message: "Products Retrieved Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Products",
      error: error.message,
    });
  }
};

//get single product
export const getSingleProducts = async (req, res) => {
  try {
    const product = await ProductSchemaModel.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-image");
    res.status(200).send({
      success: true,
      message: "single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Single Product",
      error,
    });
  }
};

export const getProductImage = async (req, res) => {
  try {
    const productImage = await ProductSchemaModel.findById(
      req.params.pid
    ).select("image");
    if (productImage.image.data) {
      res.set("content-type", productImage.image.contentType);
      return res.status(200).send(productImage.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Image not found",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductSchemaModel.findByIdAndDelete(req.params.pid).select("-image");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "image is Required and should be less then 1mb" });
    }

    const products = await ProductSchemaModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

//filter
export const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductSchemaModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

//product count
export const productCount = async (req, res) => {
  try {
    const total = await ProductSchemaModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Count Displayed",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while count product",
      error,
    });
  }
};

export const productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductSchemaModel.find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductSchemaModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-image");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while search product",
      error,
    });
  }
};

//similar product -related product
export const similarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await ProductSchemaModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-image")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "related product showed successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while similar product fetched",
      error,
    });
  }
};

//get product by category
export const productCategorySingle = async (req, res) => {
  try {
    const category = await CategorySchemaModel.findOne({
      slug: req.params.slug,
    });
    console.log(slug);

    const products = await ProductSchemaModel.find({ category }).populate(
      "category"
    );
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
export const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "error while get braintree token",
      error,
    });
  }
};

//payment
export const braintreePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = OrderSchemaModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in payment",
      error,
    });
  }
};
