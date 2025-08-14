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

// ********* UPDATE single expenses
expenseRoute.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseID = req.params.id;
      const updateExpenses = req.body;

      // Only validate if amount is provided and less than and equal to 0
      if (updateExpenses.amount !== undefined && updateExpenses.amount <= 0) {
        throw new Error("Amount must be greater than 0!");
      }

      const expense = await Expenses.findByIdAndUpdate(
        expenseID,
        updateExpenses,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: "Expense updated successfully!",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  }
);
