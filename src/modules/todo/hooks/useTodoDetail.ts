import { getTodoList } from "@/redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export const useTodoDetail = () => {
    const list = useAppSelector((state) => state.todoReducer.list);
    const isFetch = useAppSelector((state) => state.todoReducer.isFetch);
    const isLoading = useAppSelector((state) => state.todoReducer.isLoading);
    const error = useAppSelector((state) => state.todoReducer.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isFetch) {
            dispatch(getTodoList())
        }
    }, [])

    const refetch = () => {
        dispatch(getTodoList())
    }

    return {
        list,
        isFetch,
        isLoading,
        error,
        refetch,
    }
}