

export interface TodoProps {
    id : string,
    content : string,
    isDone : boolean,
    deadlineTime : any,
    onPress : () => void,
    onLongPress : (id : string) => void,
    createdAt: any,
    title : string
    priority : "low" | "medium" | "high"
}