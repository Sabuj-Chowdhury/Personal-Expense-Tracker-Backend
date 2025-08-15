import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./app/middleware/errorHandler";
import { expenseRoute } from "./app/module/expenses/expenses.controller";
import { userRoute } from "./app/module/user/user.controller";
import { authRoute } from "./app/module/auth/auth.controller";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/expenses", expenseRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "welcome to Personal Expense tracker API!",
  });
});

// global error Handler
app.use(errorHandler.globalErrorHandler);

// NOT found route middleware
app.use(errorHandler.notFoundRoute);

export default app;
