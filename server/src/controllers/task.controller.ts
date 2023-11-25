import { Request, Response } from "express";
import TaskModel from "../models/Task";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../services/task.service";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const createdTask = await createTaskService(title);

    res.json(createdTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTaskHandler = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasksService();
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const newTitle = req.body.title;

    const updatedTask = await updateTaskService(taskId, newTitle);

    if (!updatedTask) {
      return res.sendStatus(404);
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await deleteTaskService(taskId);

    if (!deletedTask) {
      return res.sendStatus(404);
    }

    res.json(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
