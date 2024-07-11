import { createSlice } from "@reduxjs/toolkit"; //importing createSlice from Redux Toolkit

// Initial state of the todo slice, including the list of todos and the current sorting criteria.
const initialState = {
  todoList: [],
  sortCriteria: "All",
};

// Creating a slice for todos with a name, initial state, and reducers to handle actions.
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Reducer to set the entire todo list with a new array of todos.
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    // Reducer to add a new todo item to the list.
    addTodo: (state, action) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    // Reducer to change the sorting criteria of the todo list.
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    // Reducer to update a specific todo item's task description.
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].task = task;
    },
    // Reducer to toggle the completion status of a todo item.
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = !state.todoList[index].completed;
    },
  },
});

export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } =
  TodoSlice.actions;

export default TodoSlice.reducer;
