import React from "react";

const TodoCard = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="bg-white m-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 w-full max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-lg sm:text-xl font-semibold leading-snug ${
            todo.completed ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {todo.title}
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo)}
            className="h-5 w-5 accent-indigo-600 cursor-pointer"
          />

          <span
            className={`text-sm font-medium ${
              todo.completed ? "text-green-600" : "text-slate-500"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <p
        className={`mt-2 text-sm sm:text-base leading-relaxed ${
          todo.completed ? "text-slate-400 line-through" : "text-slate-500"
        }`}
      >
        {todo.description}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => onEdit(todo)}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo)}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
