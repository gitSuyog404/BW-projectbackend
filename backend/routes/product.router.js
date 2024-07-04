import express from "express";
import { checkAuth, checkAdmin } from "../middleware/authToken.js";

import {
  getAllProduct,
  getProductById,
  getTopProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/products", getAllProduct);
router.get("/getproduct", getProductById);
router.get("/topproducts", getTopProducts);
router.post("/addproduct", checkAuth, checkAdmin, addProduct);
router.put("/updateproduct/:id", checkAuth, checkAdmin, updateProduct);
router.delete("/deleteproduct", checkAuth, checkAdmin, deleteProduct);
