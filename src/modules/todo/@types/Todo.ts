export type Todo = {
	_id: string
	title: string
	description: string
	createdAt: string
	updatedAt: string
}

export type IDTodoPayload = {
    id: string
}

export type CreateTodoPayload = {
  title: string
  description: string
}

export type UpdateTodoPayload = {
    id: string
    title: string
    description: string
  }