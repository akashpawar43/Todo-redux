import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.js";

// Creating and exporting the Redux store
export default configureStore({
    // Configuring the store with a reducer
    reducer: {
        // Defining a slice named 'todos' and associating it with the 'todoReducer'
        todos: todoReducer,
    },
});
