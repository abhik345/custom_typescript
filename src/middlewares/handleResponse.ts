import { Request, Response, NextFunction } from "express";

export const handleResponse = (req: Request, res: Response, next: NextFunction) => {
  (res as any).handleResponse = (status: number, message: string, data?: any) => {
    res.status(status).json({ status, message, ...(data ? { data } : {}) });
  };
  next();
};
