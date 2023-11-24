import { Express } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  updateTaskHandler,
} from "./controllers/task.controller";

const routes = (app: Express) => {
  app.post("/task", createTaskHandler);

  app.get("/tasks", getTaskHandler);

  app.put("/task/update/:id", updateTaskHandler);

  app.delete("/task/delete/:id", deleteTaskHandler);
};

export default routes;
