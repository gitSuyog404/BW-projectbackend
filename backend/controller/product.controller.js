// import Product from "../models/product.model.js";
// import ApiError from "../utils/apiError.js";
// import { asyncHandler } from "../middleware/asynchandler.middleware.js";

// const getAllProduct = asyncHandler(async (req, res, next) => {
//   try {
//     const products = await Product.find;
//     // if (!products) {
//     //   throw new ApiError(404, "Product not found");
//     // }
//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// const getProductById = asyncHandler(async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       throw new ApiError(404, "Product not found");
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// const getTopProducts = asyncHandler(async (req, res, next) => {
//   try {
//     const limit = Number(req.query.limit) || 10;
//     const topProducts = await Product.find().sort({ rating: -1 }).limit(limit);

//     res.status(200).json({
//       success: true,
//       data: topProducts,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// const addProduct = asyncHandler(async (req, res, next) => {
//   try {
//     const newProduct = new Product({
//       name,
//       price,
//       description,
//     });

//     const product = await newProduct.save();

//     res.status(201).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// const updateProduct = asyncHandler(async (req, res, next) => {
//   const { name, price, description } = req.body;
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       throw new ApiError(404, "Product not found");
//     }

//     product.name = name;
//     product.price = price;
//     product.description = description;

//     product = await product.save();

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     next(new ApiError(400, "Could not update product"));
//   }
// });

// const deleteProduct = asyncHandler(async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       throw new ApiError(404, "Product not found");
//     }

//     res.status(200).json({
//       success: true,
//       data: {},
//     });
//   } catch (err) {
//     next(new ApiError(400, "Failed to delete product"));
//   }
// });

// export {
//   getAllProduct,
//   getProductById,
//   getTopProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };

// Sir ko code

import { asyncHandler } from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import { isPrice, isProduct } from "../utils/validator.js";

// @desc get all products
// @route /api/v1/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// @desc get  products by id
// @route /api/v1/products/:id
// @access public

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res.send(product);
});

// @desc get top products according to rating
// @route /api/v1/products/topproducts/:limit
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  const limit = req.params.limit;
  const products = await Product.find({}).sort({ rating: -1 }).limit(limit);
  res.send(products);
});

// @desc add products
// @route /api/v1/addproduct
// @access private/admin
const addProduct = asyncHandler(async (req, res) => {
  let { name, price } = req.body;
  // count in stock pani product banauda add garne
  // for price with 2 decimal places
  if (!isPrice(price)) {
    throw new ApiError(400, "Invalid Password");
  }

  if (!isProduct(name)) {
    throw new ApiError(400, "Invalid Product Name");
  }
  const product = await Product.create({ ...req.body, user: req.user._id });
  res.send({ message: "Product created successfully", product });
});

// @desc update Products
// @route /api/v1/updateproduct
// @access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  // filter garne kura jaile params bata linxa
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    Object.assign(product, { ...req.body });
    /*
    OR
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price  || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category



    */

    const updatedProduct = await product.save();
    res.send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } else {
    throw new ApiError(404, "Product not found");
  }
});

// @desc delete Products
// @route /api/v1/products/delete/:id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const removed = await Product.findByIdAndDelete(id);

  if (removed) {
    res.send({ message: "Product deleted successfully" });
  } else {
    throw new ApiError(404, "Product not found");
  }
});

const addReview = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const newReview = {
    ...req.body,
    name: req.user.name,
    user: req.user._id,
  };

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let reviewAdded = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (reviewAdded) {
    throw new ApiError(400, "Review already added");
  }
  product.reviews.push(newReview);
  product.numReviews = product.reviews.length;

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  // yo average rating lai decimal mai pathaune
  product.rating = (totalRating / product.reviews.length).toFixed(2);

  await product.save();

  res
    .status(201)
    .json({ message: "Review added successfully", review: newReview });
});

// Sir ko code
// To add user review
// const addUserReview = asyncHandler(async (req, res) => {
//   let id = req.params.id;
//   const product = await Product.findById(id);
//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }

//   let { rating, comment } = req.body;
// To check whether the user has already added the review or not
// let reviewAdded = product.reviews.find(
//   (review)=>review.user.toString() === req.user._id.toString()
// )
//   product.reviews.push({
//     name: req.user.name,
//     rating,
//     comment,
//     user: req.user._id,
//   });

//   await product.save();
//   res.send({ message: "Product review added!" });
// });

export {
  getProducts,
  getProductById,
  getTopProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
