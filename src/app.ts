import express, { Request, Response } from "express";
import cors from "cors";
import notFoundRoute from "./app/middleware/notFoundRoute";

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

// NOT found route middleware
app.use(notFoundRoute);

export default app;
