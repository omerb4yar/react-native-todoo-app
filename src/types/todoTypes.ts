import Todo from "../models/Todo"

export interface CreateTodoType {
    userId : string,
    content : string,
    isDone : boolean,
    title : string
    priority : "low" | "medium" | "high",
    isArchived? : boolean,
    deadlineTime? : any
} 


export type CreateTodo = (todo : CreateTodoType) => Promise<string>

export type DeleteTodoById = (id : string) => Promise<void>

export type FindTodosByUserId = (userId : string) => Promise<Todo[]>

export type FindTodoById = (id : string) => Promise<Todo>

export type UpdateTodoById = (id : string, newTodo : Partial<Todo>) => Promise<void>
