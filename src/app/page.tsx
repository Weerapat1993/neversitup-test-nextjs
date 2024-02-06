"use client";

import { useAppSelector } from "@/redux/hooks";
import TodoList from "../modules/todo/components/TodoList";
import { AuthModal } from "@/modules/auth/AuthModal";

export default function Home() {
  const isLoggedIn = useAppSelector((state) => Boolean(state.authReducer?.data?.token));
  return (
    <div>
      {isLoggedIn ? (
        <TodoList />
      ) : (
        <AuthModal />
      )}
    </div> 
  );
}