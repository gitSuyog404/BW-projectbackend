import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    // if yo code development ma xaina ra production ma xa vane chai yo http bata https ma convert hunxa
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // converting it to millisecond
  });
};

export default createToken;
