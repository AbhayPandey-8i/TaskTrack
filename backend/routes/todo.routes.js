import express from "express";
import {
  createTodo,
  deleteTodo,
  getCreatorTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo);
router.route("/getTodo").get(isAuthenticated, getCreatorTodo);
// router.route("/:todoId").get(isAuthenticated, getTodoById);
router.route("/getTodo/:todoId").get(isAuthenticated, getTodoById);
router.route("/update/:todoId").put(isAuthenticated, updateTodo);
router.route("/delete/:todoId").delete(isAuthenticated, deleteTodo);

export default router;
