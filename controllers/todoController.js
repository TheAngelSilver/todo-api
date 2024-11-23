import { Todo } from "../models/Todo.js";
import { AppError } from "../utils/AppError.js";

export const createTodo = async (req, res, next) => {
  try {
    if (!req.body.title) {
      throw new AppError("Title is required", 400);
    }

    const todo = await Todo.create(req.body);
    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const { search, completed, priority } = req.query;
    const filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (completed) filter.completed = completed === "true";
    if (priority) filter.priority = priority;

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
