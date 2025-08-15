import { NextFunction, Request, Response, Router } from "express";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

export const userRoute = Router();

userRoute.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IUser = req.body;

      const { email, name, password } = payload;

      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
        throw new Error("User already Exists!");
      }

      const hashedPassword = await bcryptjs.hash(password as string, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: "user created successfully!",
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
