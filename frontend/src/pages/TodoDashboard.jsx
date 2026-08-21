import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import AddTodo from "../components/AddTodo";
import EditTodo from "../components/EditTodo";
import DeleteTodo from "../components/DeleteTodo";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, updateTodo } from "../features/todoSlice";

const TodoDashboard = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo.todos); //useSelectore means: give me this data from redux

  // const [todos, setTodos] = useState([]); //consist my todos
  const [addTodoModal, setAddTodoModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [deleteTodoModal, setDeleteTodoModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //To fetctAllTodos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todo/getTodo");

        dispatch(setTodos(res.data.todo));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleToggleComplete = async (todo) => {
    try {
      const res = await api.put(`/todo/update/${todo._id}`, {
        completed: !todo.completed,
      });

      if (res.data.success) {
        dispatch(updateTodo(res.data.updatedTodo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTaskModal = () => {
    setAddTodoModal(true);
  };
  const handleCloseTaskModal = () => {
    setAddTodoModal(false);
  };
  const handleEditTodoModal = (todos) => {
    setSelectedTodo(todos);
    setEditTodoModal(true);
  };
  const handleCloseEditTodoModal = () => {
    setEditTodoModal(false);
  };
  const handleDeleteTodoModal = (todos) => {
    setSelectedTodo(todos);
    setDeleteTodoModal(true);
  };
  const handleCloseDeleteTodoModal = () => {
    setDeleteTodoModal(false);
  };

  return (
    <div>
      <Navbar />
      {/* Welcome section */}
      <section className="w-full max-w-2xl mt-4 mx-auto text-center">
        {/* <!-- Eyebrow / tag --> */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          <span className="text-xs sm:text-sm font-medium text-indigo-600 tracking-wide">
            Stay on top of your day
          </span>
        </div>

        {/* <!-- Heading --> */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Organize your tasks,
          <span className="block text-indigo-600">
            because your brain has better things to do.
          </span>
        </h1>

        {/* <!-- Description --> */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
          A simple, distraction-free space to plan your day, track what matters,
          and check things off as you go.
        </p>

        {/* <!-- CTA --> */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={handleAddTaskModal}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-lg shadow-indigo-600/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Task
          </button>
        </div>
      </section>

      <div>{addTodoModal && <AddTodo onClose={handleCloseTaskModal} />}</div>

      <div>
        {editTodoModal && (
          <EditTodo onClose={handleCloseEditTodoModal} todo={selectedTodo} />
        )}
      </div>

      <div>
        {deleteTodoModal && (
          <DeleteTodo
            onClose={handleCloseDeleteTodoModal}
            todo={selectedTodo}
          />
        )}
      </div>

      {/* mapping to display todos */}
      {loading ? (
        <p className="text-center mt-8 text-slate-500">Loading your todos...</p>
      ) : todos.length === 0 ? (
        <div className="text-center mt-10">
          <h3 className="text-lg font-semibold text-slate-700">No todos yet</h3>

          <p className="mt-2 text-sm text-slate-500">
            Create your first todo and start getting things done.
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onDelete={handleDeleteTodoModal}
            onEdit={handleEditTodoModal}
            onToggleComplete={handleToggleComplete}
          />
        ))
      )}
    </div>
  );
};

export default TodoDashboard;
