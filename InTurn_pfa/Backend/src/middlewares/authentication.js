import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token =
    req.cookies?.authToken || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
