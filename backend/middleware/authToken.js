import jwt from "jsonwebtoken";

const parseCookies = (cookieHeader) => {
  const cookies = {};
  cookieHeader &&
    cookieHeader.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      cookies[parts[0].trim()] = (parts[1] || "").trim();
    });
  return cookies;
};

const authToken = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authToken;
