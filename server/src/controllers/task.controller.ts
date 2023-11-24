import { Request, Response } from "express";
import TaskModel from "../models/Task";

export const createTaskHandler = async (req: Request, res: Response) => {
  const newTask = new TaskModel({
    title: req.body.title,
  });

  const createdTask = await newTask.save();

  res.json(createdTask);
};

export const getTaskHandler = async (req: Request, res: Response) => {
  const tasks = await TaskModel.find();

  res.json(tasks);
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    return res.sendStatus(404);
  }

  task.title = req.body.title;

  task.save();

  res.json(task);
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return res.sendStatus(404);
  }

  res.json(deletedTask);
};
