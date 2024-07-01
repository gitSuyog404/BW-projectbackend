// import jwt from "jsonwebtoken";

// // Use cookie parser for this

// const parseCookies = (cookieHeader) => {
//   const cookies = {};
//   cookieHeader &&
//     cookieHeader.split(";").forEach((cookie) => {
//       const parts = cookie.split("=");
//       cookies[parts[0].trim()] = (parts[1] || "").trim();
//     });
//   return cookies;
// };

// const authToken = (req, res, next) => {
//   const cookies = parseCookies(req.headers.cookie);
//   const token = cookies.jwt;

//   if (!token) {
//     return res.status(401).json({ message: "Access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };

// export default authToken;

// sir ko code
// status code 401 use hunxa 401 = unauthorized
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "./asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";

const checkAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    throw new ApiError(401, "You must be logged in!");
    // let err = new Error("You must be logged in!");
    // err.status = 401;
    // throw err;
  }

  try {
    let { userId } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userId).select("-password");
    req.user = user;
    next();
  } catch (e) {
    throw new ApiError(401, "Invalid Token");
    // let err = new Error("Invalid token");
    // err.status = 401;
    // throw err;
  }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new ApiError(403, "Access Denied");
    // let err = new Error("Access Denied");
    // err.status = 403;
    // throw err;
  }
});

export { checkAuth, checkAdmin };

// sir ko code

// const checkAdmin = async (req, res, next) => {
//   const isAdmin = req.user?.isAdmin; // ? vaneko chai you value undefined/null huna sakxa vaneko ho
//   if (isAdmin) {
//     next();
//   } else {
//     let err = new Error("You are not authorized to perform this operation");
//     err.status = 403;
//     throw err;
//   }
// };

// export { checkAuth, checkAdmin };
