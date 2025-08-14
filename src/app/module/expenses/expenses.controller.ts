import { NextFunction, Request, Response, Router } from "express";
import { Expenses } from "./expenses.model";

export const expenseRoute = Router();

// ******* CREATE Expense
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

// ********* GET all expenses

expenseRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await Expenses.find();

      res.status(200).json({
        success: true,
        message: "All expenses retrieved successfully!",
        data: expense,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
