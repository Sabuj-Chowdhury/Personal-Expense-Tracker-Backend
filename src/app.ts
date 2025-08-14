import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./app/middleware/errorHandler";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

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
