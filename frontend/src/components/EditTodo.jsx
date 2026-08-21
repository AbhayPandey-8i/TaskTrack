import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTodo } from "../features/todoSlice";

const EditTodo = ({ todo, onClose }) => {
  //will store edit todo
  const [todoData, setTodoData] = useState({
    title: todo.title,
    description: todo.description,
  });

  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/todo/update/${todo._id}`, todoData);
      console.log(res.data);
      if (res.data.success) {
        dispatch(updateTodo(res.data.updatedTodo));
        //making todo update without refresh
        // setTodos((prevTodos) =>
        //   prevTodos.map((item) =>
        //     item._id === todo._id ? { ...item, ...todoData } : item,
        //   ),
        // );
        toast.success(res.data.message);
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white mt-4 rounded-2xl border border-slate-200 shadow-sm p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-5">
        Edit Task
      </h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={todoData.title}
            onChange={(e) =>
              setTodoData({ ...todoData, title: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={todoData.description}
            onChange={(e) =>
              setTodoData({ ...todoData, description: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
