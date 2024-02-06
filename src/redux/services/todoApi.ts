import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';

interface Todo {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

type TodosResponse = Todo[]

export const todoApi = createApi({
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer.data.token
            headers.set("Content-Type", "application/json");
            if(token) {
                headers.set("authorization",`Bearer ${token}`);
            }
            return headers;
        },
        mode: "no-cors",
        baseUrl: "https://candidate.neversitup.com/todo/",
    }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    getTodos: build.query<TodosResponse, void>({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Todo' as const, _id })),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    addTodo: build.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    getTodo: build.query<Todo, string>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, _id) => [{ type: 'Todo', _id }],
    }),
    updateTodo: build.mutation<void, Pick<Todo, '_id'> & Partial<Todo>>({
      query: ({ _id, ...patch }) => ({
        url: `todos/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Todo', _id }],
    }),
    deleteTodo: build.mutation<{ success: boolean; _id: number }, number>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, _id) => [{ type: 'Todo', _id }],
    }),
  }),
})

export const {
  useGetTodoQuery,
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi