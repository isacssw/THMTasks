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

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await TaskModel.find();

  res.json(tasks);
});

app.put("/task/update/:id", async (req: Request, res: Response) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    return res.sendStatus(404);
  }

  task.title = req.body.title;

  task.save();

  res.json(task);
});

app.delete("/task/delete/:id", async (req: Request, res: Response) => {
  const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return res.sendStatus(404);
  }

  res.json(deletedTask);
});

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
