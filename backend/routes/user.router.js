import express from "express";
import {
  signUp,
  login,
  logout,
  getUsers,
} from "../controller/user.controller.js";
import authToken from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", authToken, getUsers);

export default router;
