import supertest from "supertest";
import express, { Express } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import routes from "../routes";

const app = express();
app.use(express.json());

routes(app);

const request = supertest(app);

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Task API", () => {
  let taskId: string;

  test("Create Task", async () => {
    const response = await request.post("/task").send({ title: "Test Task" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    taskId = response.body._id;
  });

  test("Get All Tasks", async () => {
    const response = await request.get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Update Task", async () => {
    const response = await request
      .put(`/task/update/${taskId}`)
      .send({ title: "Updated Task" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", taskId);
    expect(response.body.title).toBe("Updated Task");
  });

  test("Update Non existent valid Task", async () => {
    const response = await request
      .put(`/task/update/656174712480df0402dee33c`)
      .send({ title: "Updated Task" });
    expect(response.status).toBe(404);
  });

  test("Delete Task", async () => {
    const response = await request.delete(`/task/delete/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", taskId);
  });

  test("Delete Non existent valid Task", async () => {
    const response = await request.delete(
      `/task/delete/656174712480df0402dee33c`
    );
    expect(response.status).toBe(404);
  });
});
