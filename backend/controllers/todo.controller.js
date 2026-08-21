import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

//createTodo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todo = await Todo.create({
      title,
      description,
      creator: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Task Created Successfully!",
      todo,
    });
  } catch (error) {
    console.log("Todo Creation Failed:", error);
  }
};

//getCreatorTodo
export const getCreatorTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todo = await Todo.find({ creator: userId });
    if (!todo || todo.length === 0) {
      return res.status(200).json({
        success: true,
        todo: [],
        message: "Task not found",
      });
    }
    return res.status(200).json({
      todo,
    });
  } catch (error) {
    console.log("Failed to get Todo: ", error);
  }
};

//getTodoById
export const getTodoById = async (req, res) => {
  try {
    const { todoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const todo = await Todo.findById(todoId);

    if (!todo || todo.creator.toString() !== req.userId.toString()) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      todo,
    });
  } catch (error) {
    console.log("getTodoById error occurred:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//updateTodo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = req.params.todoId;
    if (!todoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid TaskId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Task Not found",
      });
    }

    if (todo.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "Unauthorized Access",
        success: false,
      });
    }

    //creating update object;
    const update = {};

    if (title !== undefined) {
      update.title = title;
    }
    if (description !== undefined) {
      update.description = description;
    }
    if (completed !== undefined) {
      update.completed = completed;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, update, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log("failed to update todo:", error);
    res.status(500).json({
      message: "Failed to update Task",
      success: false,
    });
  }
};

//deleteTodo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    if (!todoId) {
      return res.status(400).json({
        success: false,
        message: "TaskId not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (todo.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "Unauthorized Access",
        success: false,
      });
    }

    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log("deleteTodo error: ", error);
    return res.status(500).json({
      message: "Failed to Delete Todo",
      success: false,
    });
  }
};
