import { baseUrl, defaultHeaders } from "@/config/api";
import type { CreateTodoPayload, IDTodoPayload, Todo, UpdateTodoPayload } from "@/modules/todo/@types/Todo";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type TodoState = {
  isFetch: boolean;
  isLoading: boolean;
  list: Todo[];
  error: any;
  keys: object;
  isDeleting: boolean;
  isCreating: boolean;
  isUpdating: boolean;
};


export const getTodoList = createAsyncThunk('getTodoList', async () => {
  try {
    const res = await axios({
      url: baseUrl('todos'),
      method: 'GET',
      headers: defaultHeaders()
    })
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const createTodo = createAsyncThunk('createTodo', async (payload: CreateTodoPayload) => {
  try {
    const res = await axios({
      url: baseUrl('todos'),
      method: 'POST',
      headers: defaultHeaders(),
      data: payload
    })
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const updateTodoById = createAsyncThunk('updateTodoById', async (payload: UpdateTodoPayload) => {
  try {
    const res = await axios({
      url: baseUrl(`todos/${payload.id}`),
      method: 'PUT',
      headers: defaultHeaders(),
      data: {
        title: payload.title,
        description: payload.description,
      }
    })
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const deleteTodoById = createAsyncThunk('deleteTodoById', async (payload: IDTodoPayload) => {
  try {
    const res = await axios({
      url: baseUrl(`todos/${payload.id}`),
      method: 'DELETE',
      headers: defaultHeaders()
    })
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
})

const initialState = {
  isFetch: false,
  isLoading: false,
  list: [],
  error: null,
  keys: {},
  isDeleting: false,
  isCreating: false,
  isUpdating: false,
} as TodoState;

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    // GET - LIST
    [`${getTodoList.pending}`]: (state) => {
        state.isFetch = false
        state.isLoading = true
        state.error = null
    },
    [`${getTodoList.fulfilled}`]: (state, action) => {
        state.isFetch = true
        state.isLoading = false
        state.list = action.payload
        state.error = null
    },
    [`${getTodoList.rejected}`]: (state, action) => {
        state.isFetch = false
        state.isLoading = false
        state.error = action.payload
    },
    // CREATE
    [`${createTodo.pending}`]: (state) => {
      state.isCreating = true
      state.error = null
    },
    [`${createTodo.fulfilled}`]: (state, action) => {
        state.isFetch = false
        state.isCreating = false
        state.list.push(action.payload)
        state.error = null
    },
    [`${createTodo.rejected}`]: (state, action) => {
        state.isCreating = false
        state.error = action.payload
    },
     // UPDATE
     [`${updateTodoById.pending}`]: (state) => {
      state.isUpdating = true
      state.error = null
    },
    [`${updateTodoById.fulfilled}`]: (state, action) => {
        state.isFetch = false
        state.isUpdating = false
        state.error = null
    },
    [`${updateTodoById.rejected}`]: (state, action) => {
        state.isUpdating = false
        state.error = action.payload
    },
    // DELETE
    [`${deleteTodoById.pending}`]: (state) => {
        state.isDeleting = true
        state.error = null
    },
    [`${deleteTodoById.fulfilled}`]: (state, action) => {
        state.isFetch = false
        state.isDeleting = false
        state.list = state.list.filter(item => item._id !== action.payload.id)
        state.error = null
    },
    [`${deleteTodoById.rejected}`]: (state, action) => {
        state.isDeleting = false
        state.error = action.payload
    },
  }
});

export const {
  reset,
} = todo.actions;
export default todo.reducer;
