import { Server } from "http";
import mongoose from "mongoose";
import { envVariable } from "./app/config/env";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVariable.DB_URL);
    console.log("Connected to MongoDB!");

    server = app.listen(envVariable.PORT, () => {
      console.log(`Server is running at ${envVariable.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

// uncaught exception error
process.on("uncaughtException", (err) => {
  console.log(`Uncaught exception detected ... Server shutting down ....`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// sigterm ---> signal termination error
process.on("SIGTERM", () => {
  console.log(`Signal termination error, SIGTERM....Server shutting down`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
