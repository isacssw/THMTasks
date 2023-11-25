import { Types } from "mongoose";
import TaskModel from "../models/Task";

export interface ITask {
  _id: string;
  title: string;
  timestamp: string;
}

export const createTaskService = async (title: string) => {
  const newTask = new TaskModel({
    title,
  });

  const createdTask = await newTask.save();
  return createdTask;
};

export const getTasksService = async () => {
  const tasks = await TaskModel.find();
  return tasks;
};

export const updateTaskService = async (
  taskId: string,
  newTitle: string
) => {
  const task = await TaskModel.findById(new Types.ObjectId(taskId));

  if (!task) {
    return null;
  }

  task.title = newTitle;
  await task.save();

  return task;
};

export const deleteTaskService = async (taskId: string) => {
    const deletedTask = await TaskModel.findByIdAndDelete(new Types.ObjectId(taskId));
    return deletedTask;
  };
