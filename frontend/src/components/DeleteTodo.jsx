import React from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todoSlice";

const DeleteTodo = ({ todo, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await api.delete(`/todo/delete/${todo._id}`);
      if (res.data.success) {
        dispatch(deleteTodo(todo._id));
        toast.success(res.data.message);
        //removing todo from old state

        // setTodos((prevTodos) =>
        //   prevTodos.filter((item) => item._id !== todo._id),
        // );

        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl mt-4 border border-slate-200 shadow-sm p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 text-center">
        Delete Task?
      </h2>

      <p className="text-sm sm:text-base text-slate-500 leading-relaxed text-center mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-slate-700">{todo.title}</span>? This
        action cannot be undone.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteTodo;
