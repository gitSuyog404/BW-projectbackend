// import express from "express";
// import { checkAuth, checkAdmin } from "../middleware/authToken.js";

// import {
//   getAllProduct,
//   getProductById,
//   getTopProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controller/product.controller.js";

// const router = express.Router();

// router.get("/products", getAllProduct);
// router.get("/getproduct", getProductById);
// router.get("/topproducts", getTopProducts);
// router.post("/addproduct", checkAuth, checkAdmin, addProduct);
// router.put("/updateproduct/:id", checkAuth, checkAdmin, updateProduct);
// router.delete("/deleteproduct", checkAuth, checkAdmin, deleteProduct);

// export default router;

// sir ko code

import express from "express";

import {
  getProducts,
  getProductById,
  getTopProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { checkAuth, checkAdmin } from "../middleware/authToken.js";

import { addReview } from "../controller/review.controller.js";

// new syntax
// if eutai path xa vane

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.route("/:id").get(getProductById);
router.route("/topproducts").get(getTopProducts);
router.route("/update/:id").post(checkAuth, checkAdmin, updateProduct);
router.route("/delete/:id").delete(checkAuth, checkAdmin, deleteProduct);
router.route("/:productId/addreview").post(checkAuth, addReview);

export default router;

// Assignment
// do the update and delete part by yourself
// create new route to add review for the product
