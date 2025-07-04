import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cron from "node-cron";
import dotenv from "dotenv";
import router from "./routes/TicketRoutes.js";
import runEscalation from "./controller/escalation.js";

import cors from "cors";
dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected DB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    Credential: true,
  })
);
app.use(bodyParser.json());
app.use("/api/tickets", router);

cron.schedule("*/15 * * * * *", runEscalation);

app.listen(5000, () => console.log("Server running on port 5000"));
