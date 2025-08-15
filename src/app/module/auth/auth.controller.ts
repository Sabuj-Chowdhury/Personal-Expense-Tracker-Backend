import { NextFunction, Request, Response, Router } from "express";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVariable } from "../../config/env";

export const authRoute = Router();

authRoute.post(
  "/login",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: Partial<IUser> = req.body;

      const { email, password } = payload;

      const isUserExist = await User.findOne({ email });

      if (!isUserExist) {
        throw new Error("User does not Exists!");
      }

      const isPasswordMatch = await bcrypt.compare(
        password as string,
        isUserExist.password as string
      );
      if (!isPasswordMatch) {
        throw new Error("Incorrect Password!");
      }

      const jwtPayload = { email: isUserExist.email };

      const accessToken = jwt.sign(jwtPayload, envVariable.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
      });

      const { password: pass, ...rest } = isUserExist.toObject();

      res.status(201).json({
        success: true,
        message: "logged in successfully!",
        data: {
          accessToken,
          user: rest,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
);

authRoute.post("/logout", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
