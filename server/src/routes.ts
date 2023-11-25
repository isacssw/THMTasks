import { Express } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  updateTaskHandler,
} from "./controllers/task.controller";

const routes = (app: Express) => {

  /**
   * @openapi
   * '/task':
   *  post:
   *     tags:
   *     - Task
   *     summary: create a task
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/TaskInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/TaskResponse'
   *      400:
   *        description: Bad request
   */

  app.post("/task", createTaskHandler);

  /**
   * @openapi
   * '/tasks':
   *  get:
   *     tags:
   *     - Task
   *     summary: get all tasks
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/TaskResponse'
   *      400:
   *        description: Bad request
   */

  app.get("/tasks", getTaskHandler);

 /**
  * @openapi
  * '/task/update/{taskId}':
  *  put:
  *     tags:
  *     - Task
  *     summary: Update a single task
  *     parameters:
  *      - name: taskId
  *        in: path
  *        description: The id of the task
  *        required: true
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/TaskInput'
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/TaskResponse'
  *       404:
  *         description: Task not found
  */

  app.put("/task/update/:id", updateTaskHandler);

  /**
  * @openapi
  * '/task/delete/{taskId}':
  *  delete:
  *     tags:
  *     - Task
  *     summary: Delete a single task
  *     parameters:
  *      - name: taskId
  *        in: path
  *        description: The id of the task
  *        required: true
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/TaskResponse'
  *       404:
  *         description: Task not found
  */

  app.delete("/task/delete/:id", deleteTaskHandler);
};

export default routes;
