import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// get all data using endpoint " / "
export const getTodosAsync = createAsyncThunk('todos/getTodoAsync',
    async () => {
        const response = await fetch('http://localhost:4000/');
        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }

    }
)

// get all data using endpoint " /add "
export const addTodosAsync = createAsyncThunk('todos/addTodoAsync',
    async (payload) => {
        const response = await fetch('http://localhost:4000/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: payload.title,
                description: payload.description,
            }),
        })
        if (response.ok) {
            const todos = await response.json()
            return { todos };
        }
    }
)

// get all data using endpoint " /update/:id "
export const completeTododAsync = createAsyncThunk("todos/completeTodoAsync",
    async (payload) => {
        const response = await fetch(`http://localhost:4000/update/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                complete: payload.complete,
            }),
        })
        if (response.ok) {
            const todos = await response.json()
            return { id: todos._id, complete: todos.complete };
        }
    }
)

// get all data using endpoint " /delete/:id "
export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async (payload) => {
    const response = await fetch(`http://localhost:4000/delete/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    })
    if (response.ok) {
        const todos = await response.json();
        return { id: todos._id, complete: todos.complete };
    }
})

// Creating a Redux slice named "todos"
const todoSlice = createSlice({
    name: "todos",
    // Initial state for the slice
    initialState: [
        // { id: 1, title: "Task 1", description: "This is task", complete: false },
        // { id: 2, title: "Task 2", description: "This is task", complete: false },
        // { id: 3, title: "Task 3", description: "This is task", complete: true },
    ],
    // Reducer functions for handling state changes
    reducers: {
        // Reducer function for adding a new todo
        addTodo: (state, action) => {
            // Creating a new todo object based on the action payload
            const newTodo = {
                // id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                complete: false
            };
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo._id === action.payload.id);
            state[index].complete = action.payload.complete;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo._id !== action.payload.id);
        },
    },
    extraReducers: builder => {
        builder.addCase(getTodosAsync.fulfilled, (state, action) => {
            return action.payload.todos;
        }),
            builder.addCase(addTodosAsync.fulfilled, (state, action) => {
                state.push(action.payload.todos);
            }),
            builder.addCase(completeTododAsync.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo._id === action.payload.id);
                state[index].complete = action.payload.complete;
            })
            builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
                return state.filter((todo) => todo._id !== action.payload.id);
            })
    }
})

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;