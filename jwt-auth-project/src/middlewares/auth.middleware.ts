import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "No token found",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
};
