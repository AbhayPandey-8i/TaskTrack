import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const AddTodo = ({ onClose }) => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/todo", todo);
      if (res.data.success) {
        dispatch(addTodo(res.data.todo));
        toast.success(res.data.message);
        // setTodos((prevTodos) => [...prevTodos, res.data.todo]);
        onClose();
      }
      console.log(res);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-4 rounded-2xl border border-slate-200 shadow-sm p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-5">
        Create Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Title
          </label>
          <input
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            type="text"
            placeholder="Enter task title"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            placeholder="Enter task description"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
