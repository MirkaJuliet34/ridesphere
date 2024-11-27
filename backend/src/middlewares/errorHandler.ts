import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message); // Log do erro para depuração

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
};

export default errorHandler;
