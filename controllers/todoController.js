import { Todo } from "../models/Todo.js";

// Create todo
export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
