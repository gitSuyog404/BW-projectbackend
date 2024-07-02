import express from "express";
import {
  signUp,
  login,
  logout,
  getUsers,
  userProfile,
  updateProfile,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import { checkAuth, checkAdmin } from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, userProfile);
router.put("/updateprofile", checkAuth, updateProfile);
router.put("/updateuser/:id", checkAuth, checkAdmin, updateUser);
router.delete("/deleteuser/:id", checkAuth, checkAdmin, deleteUser);

export default router;
