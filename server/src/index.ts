import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import TaskModel from "./models/Task";

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/task", async (req: Request, res: Response) => {
  const newTask = new TaskModel({
    title: req.body.title,
  });

  const createdTask = await newTask.save();

  res.json(createdTask);
});

mongoose
  .connect(
    process.env.MONGODB_URL!)
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
  });
