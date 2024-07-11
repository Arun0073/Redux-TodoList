import { configureStore } from "@reduxjs/toolkit"; // Importing the configureStore function from Redux Toolkit to set up the store.
import TodoReducer from "../ToDoSlice"; // Importing the TodoReducer which handles actions related to todos.


// Creating the Redux store and configuring it with reducers.
// Reducers specify how the application's state changes in response to actions.
const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});
export default store;
