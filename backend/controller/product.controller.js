import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../middleware/asynchandler.middleware.js";

const getAllProduct = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find;
    if (!products) {
      throw new ApiError(404, "Product not found");
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

const getTopProducts = asyncHandler(async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const topProducts = await Product.find().sort({ rating: -1 }).limit(limit);

    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (err) {
    next(err);
  }
});

const addProduct = asyncHandler(async (req, res, next) => {
  try {
    const newProduct = new Product({
      name,
      price,
      description,
    });

    const product = await newProduct.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description } = req.body;
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    product.name = name;
    product.price = price;
    product.description = description;

    product = await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(new ApiError(400, "Could not update product"));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(new ApiError(400, "Failed to delete product"));
  }
});

export {
  getAllProduct,
  getProductById,
  getTopProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
