import express from "express";
import cookieParser from "cookie-parser";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

// router imports
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";

// Initialize express app

const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// Implement middleware in this code
app.use(logger);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
