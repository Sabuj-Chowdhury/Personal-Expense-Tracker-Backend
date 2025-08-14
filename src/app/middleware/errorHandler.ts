import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not Found!",
  });
};

export const errorHandler = {
  globalErrorHandler,
  notFoundRoute,
};
