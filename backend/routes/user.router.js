import express from "express";
import {
  signUp,
  login,
  logout,
  getUsers,
} from "../controller/user.controller.js";
import { checkAuth, checkAdmin } from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);

export default router;
