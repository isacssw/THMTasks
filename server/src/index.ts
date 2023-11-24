import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import TaskModel from "./models/Task";
import { createTaskHandler, deleteTaskHandler, getTaskHandler, updateTaskHandler } from "./controllers/task.controller";

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/task", createTaskHandler);

app.get("/tasks", getTaskHandler);

app.put("/task/update/:id", updateTaskHandler);

app.delete("/task/delete/:id", deleteTaskHandler);

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
