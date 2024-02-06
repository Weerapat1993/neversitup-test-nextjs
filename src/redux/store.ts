import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import authReducer from "./features/authSlice";
import todoReducer from "./features/todoSlice";
import { todoApi } from "./services/todoApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    authReducer,
    todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      todoApi.middleware,
    ]),
});

const makeStore = () => {
  let initialStore = store
  return initialStore
}

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeWrapper = createWrapper(makeStore);
