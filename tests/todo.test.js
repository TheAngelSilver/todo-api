import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { Todo } from "../models/Todo.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Todo API", () => {
  test("Should create a new todo", async () => {
    const response = await request(app).post("/api/todos").send({
      title: "Test Todo",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe("Test Todo");
  });

  test("Should get all todos", async () => {
    const response = await request(app).get("/api/todos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });
});

describe("Todo API Advanced Features", () => {
  test("Should filter todos by completion status", async () => {
    const response = await request(app)
      .get("/api/todos")
      .query({ completed: true });
    expect(response.statusCode).toBe(200);
  });
});
