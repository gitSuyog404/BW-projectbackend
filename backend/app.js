import express from "express";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

// router imports
import userRouter from "./routes/user.router.js";

// Initialize express app

dotenv.config();

const app = express();

// middleware

app.use(express.json());

app.use("/api/v1/users", userRouter);

// Implement middleware in this code
app.use(logger);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
