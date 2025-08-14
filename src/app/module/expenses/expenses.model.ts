import { model, Schema } from "mongoose";
import { IExpenses } from "./expenses.interface";

const expensesSchema = new Schema<IExpenses>(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => v > 0,
        message: "Amount must be greater than 0",
      },
    },
    category: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Expenses = model<IExpenses>("Expenses", expensesSchema);
