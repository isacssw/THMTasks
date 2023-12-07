import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../services/task.service";
import tryCatch from "../utils/tryCatch";

export const createTaskHandler = tryCatch(
  async (req: Request, res: Response) => {
    const { title } = req.body;
    const createdTask = await createTaskService(title);
    res.json(createdTask);
  }
);

export const getTaskHandler = tryCatch(async (req: Request, res: Response) => {
  const tasks = await getTasksService();
  res.json(tasks);
});

export const updateTaskHandler = tryCatch(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const newTitle = req.body.title;

    const updatedTask = await updateTaskService(taskId, newTitle);
    res.json(updatedTask);
  }
);

export const deleteTaskHandler = tryCatch(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const deletedTask = await deleteTaskService(taskId);

    res.json(deletedTask);
  }
);
