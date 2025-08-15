import { NextFunction, Request, Response, Router } from "express";
import { Expenses } from "./expenses.model";
import { IExpenses } from "./expenses.interface";
import { checkAuth } from "../../middleware/checkAuth";

export const expenseRoute = Router();

// ******* CREATE Expense
expenseRoute.post(
  "/",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IExpenses = req.body;

      const expense = await Expenses.create(payload);

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
  checkAuth,
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
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseID = req.params.id;
      const updateExpenses: Partial<IExpenses> = req.body;

      const isExist = await Expenses.findById(expenseID);

      //   if id doesn't match
      if (!isExist) {
        throw new Error("no such expense id found!");
      }

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

//******** DELETE expenses

expenseRoute.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseID = req.params.id;

      const isExist = await Expenses.findById(expenseID);
      if (!isExist) {
        throw new Error("no such expense found!");
      }

      const expense = await Expenses.findByIdAndDelete(expenseID, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Expense deleted successfully!",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  }
);
