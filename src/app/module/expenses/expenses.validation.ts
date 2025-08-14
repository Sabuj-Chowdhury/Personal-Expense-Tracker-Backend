import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  amount: z.number().gt(0, "Amount must be greater than 0"),
  category: z.string().optional(),
  date: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date()
  ),
});

export const updateExpenseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .optional(),
  amount: z.number().gt(0, "Amount must be greater than 0").optional(),
  category: z.string().optional(),
  date: z
    .preprocess(
      (val) =>
        typeof val === "string" || val instanceof Date ? new Date(val) : val,
      z.date()
    )
    .optional(),
});
