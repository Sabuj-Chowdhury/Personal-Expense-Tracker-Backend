import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config/env";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new Error("No token found!");
    }

    const verifyToken = jwt.verify(
      accessToken,
      envVariable.JWT_ACCESS_SECRET
    ) as JwtPayload;

    if (!verifyToken) {
      throw new Error("You are not authorized!");
    }

    next();
  } catch (error) {
    next(error);
  }
};
