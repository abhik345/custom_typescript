import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret = "secret125478";

export interface CustomRequest extends Request {
  userId?: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.slice(7);
  if (!token) {
    res.status(403).json({ error: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    (req as CustomRequest).userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
