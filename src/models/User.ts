
export default interface User {
    username : string
    name? : string
    surname? : string
    phoneNumber? : string,
    email : string
    createdAt? : any
    updatedAt? : any
    photoUrl? : string,

    stats?: {
        activeTodos: number;
        complatedTodos: number;
        totalComplatedTodos? : number
    };
}