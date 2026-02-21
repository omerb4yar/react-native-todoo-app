
export default interface Todo {
    id : string,
    userId : string,
    updatedAt? : any,
    content : string,
    isDone : boolean,
    title : string
    createdAt? : any,
    isArchived? : boolean,
    archivedAt? : any,
    priority : "low" | "medium" | "high",
    deadlineTime? : any
} 