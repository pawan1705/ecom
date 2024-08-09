import CategorySchemaModel from "../Models/CategoryModel.js";
import slugify from "slugify";
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: " name for the category is required" });
    }
    const existingCategory = await CategorySchemaModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new CategorySchemaModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

//update category

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategorySchemaModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updation category",
      error,
    });
  }
};

//get all category
export const getCategory = async (req, res) => {
  try {
    const category = await CategorySchemaModel.find({});
    res.status(200).send({
      success: true,
      message: "Category Fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting All Cateogory",
      error,
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const category = await CategorySchemaModel.findOne({
      slug: req.params._id,
    });
    res.status(200).send({
      success: true,
      message: "Get Single Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting category By Id",
    });
  }
};

//delete

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategorySchemaModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
