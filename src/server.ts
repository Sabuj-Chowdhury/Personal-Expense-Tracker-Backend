import express from "express";
import { Server } from "http";
import mongoose from "mongoose";

import { envVariable } from "./app/config/env";

const app = express();

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
