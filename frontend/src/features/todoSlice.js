import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload; //action.payload means the data i'll be sending with dispatch
    },

    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    updateTodo: (state, action) => {
      const updatedTodo = action.payload;

      const index = state.todos.findIndex(
        (todo) => todo._id === updatedTodo._id,
      );

      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
