import express from "express";
import { signUp, login } from "../controller/user.controller.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.get("/protected", authenticateJWT, (req, res) => {
  res.send("This is a protected route");
});

export default router;
