import { NextFunction, Request, Response, Router } from "express";
import { Expenses } from "./expenses.model";

export const expenseRoute = Router();

expenseRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const expense = await Expenses.create(body);

      res.status(201).json({
        success: true,
        message: "Expense created successfully!",
        data: expense,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
