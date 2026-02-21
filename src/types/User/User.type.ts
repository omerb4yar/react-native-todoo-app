export default interface UserType {

    username?: string
    name?: string
    surname?: string
    phoneNumber?: string,
    email?: string
    photoUrl?: string,
    doneTodos?: number,

    stats?: {
        activeTodos?: number;
        completedTodos?: number;
        totalComplatedTodos?: number
    };
}