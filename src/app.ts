import express, { Request, Response } from "express";
import cors from "cors";
import notFoundRoute from "./app/middleware/notFoundRoute";
import globalErrorHandler from "./app/middleware/globalErrorhandler";

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
app.use(globalErrorHandler);

// NOT found route middleware
app.use(notFoundRoute);

export default app;
