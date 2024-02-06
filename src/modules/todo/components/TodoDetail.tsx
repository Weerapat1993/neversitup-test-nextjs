"use client"

type Props = {
    params: ParamsPage
}

type ParamsPage = {
    id: string
}

const TodoDetail = (props: Props) => {
    const { params } = props
    // const { list, isFetch, isLoading, error } = useTodoList()
    return (
        <h1>Todo Detail ID: {params.id}</h1>
    )
}

export default TodoDetail