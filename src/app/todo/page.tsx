// import { useAppDispatch } from "@/redux/hooks";
import { AuthModal } from "@/components/auth/AuthModal";
import TodoList from "../../modules/todo/components/TodoList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function TodoPage() {
  const dispatch = useAppDispatch();
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
  