import { getTodoList } from "@/redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const useTodoList = () => {
    const list = useAppSelector((state) => state.todoReducer.list);
    const isFetch = useAppSelector((state) => state.todoReducer.isFetch);
    const isLoading = useAppSelector((state) => state.todoReducer.isLoading);
    const error = useAppSelector((state) => state.todoReducer.error);
    const isFetchPrev = usePrevious(isFetch);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isFetch) {
            dispatch(getTodoList())
        }
    }, [])

    useEffect(() => {
		if(!isFetch && isFetchPrev) {
			refetch()
		}
	}, [isFetch, isFetchPrev]) 

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