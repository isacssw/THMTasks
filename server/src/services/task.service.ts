import { Types } from "mongoose";
import TaskModel from "../models/Task";
import { ApplicationError } from "../utils/ApplicationError";

export interface ITask {
  _id: string;
  title: string;
  timestamp: string;
}

export const createTaskService = async (title: string) => {
  if (!title)
    throw new ApplicationError("Title is Required", 400, "CREATE_ERROR");

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

export const updateTaskService = async (taskId: string, newTitle: string) => {
  const task = await TaskModel.findById(new Types.ObjectId(taskId));

  if (!task) {
    throw new ApplicationError("Task not found to update", 404, "UPDATE_ERROR");
  }

  task.title = newTitle;
  await task.save();

  return task;
};

export const deleteTaskService = async (taskId: string) => {
  const deletedTask = await TaskModel.findByIdAndDelete(
    new Types.ObjectId(taskId)
  );

  if (!deletedTask)
    throw new ApplicationError("Task not found to delete", 404, "DELETE_ERROR");

  return deletedTask;
};
