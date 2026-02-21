import { useCallback, useEffect, useState } from "react"
import Todo from "../models/Todo"
import { User } from "@firebase/auth";
import { todoService } from "../services/todoService";
import { userService } from "../services/userService";
import { increment } from "firebase/firestore";

export interface TodosOptions {
    isArchived?: boolean
}

const useTodos = (user: User | null, todosOptions?: TodosOptions) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    const [loadingTodos, setLoadingTodos] = useState<boolean>(false);
    const [addingTodo, setAddingTodo] = useState<boolean>(false);
    const [archivingTodo, setArchivingTodo] = useState<boolean>(false);
    const [complatingTodo, setComplatingTodo] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            setTodos([]);
            return;
        }

        setLoadingTodos(true);

        const unsubscribe = todoService.subscribeToTodos(user.uid, (newTodos) => {
            newTodos.forEach(async (todo) => {
                await archiveTodoIfExpired(todo);
            });
            setTodos(newTodos);
            setLoadingTodos(false);
        }, { isArchived: todosOptions?.isArchived ? true : false });

        return () => {
            unsubscribe();
        };

    }, [user, todosOptions?.isArchived]);

    const loadTodos = useCallback(async () => {

        if (!user) throw new Error("User not found!");

        setLoadingTodos(true);

        try {

            const todos = await todoService.findTodosByUserId(user.uid, { isArchived: todosOptions?.isArchived ? true : false });

            todos.map(async (todo) => {
                await archiveTodoIfExpired(todo);
            })

            setTodos(todos);

        } catch (error) {

            throw error;

        } finally {
            setLoadingTodos(false)
        }

    }, [user, todosOptions?.isArchived]);

    const addTodo = useCallback(async (content: string, title: string, priority: Todo["priority"], deadlineTime: number) => {

        if (!user) throw new Error("User not found!");

        setAddingTodo(true);

        try {
            await todoService.addTodo({
                content,
                title,
                priority,
                deadlineTime,
                isDone: false,
                userId: user.uid,
            })

        } catch (error) {

            throw error

        } finally {
            setAddingTodo(false)
        }
    }, [user]);

    const archiveTodo = useCallback(async (id: string) => {

        if (!user) throw new Error("User not found!");

        setArchivingTodo(true);

        try {

            await todoService.arhiveTodo(id);

        } catch (error) {
            throw error;
        } finally {
            setArchivingTodo(false)
        }

    }, [user]);

    const complateTodo = useCallback(async (id: string) => {

        if (!user) throw new Error("User not found!");

        setComplatingTodo(true);

        try {

            await todoService.updateTodo(id, { isDone: true });

        } catch (error) {
            throw error;
        } finally {
            setComplatingTodo(false)
        }
    }, [user]);

    return {
        todos,
        loadingTodos,

        addTodo,
        archiveTodo,
        complateTodo,

        addingTodo,
        archivingTodo,
        complatingTodo,

        reloadTodos: loadTodos
    }

}

const archiveTodoIfExpired = async (todo: Todo) => {

    if (todo.isArchived) return;

    if (!todo.createdAt || !todo.createdAt.seconds) return;

    const isExpired = isTodoExpired(todo.createdAt.seconds);

    if (isExpired) {
        await todoService.arhiveTodo(todo.id);
    }
}

const isTodoExpired = (seconds: number): boolean => {
    const createdAtDate = new Date(seconds * 1000);

    const now = new Date()

    const diffMs = now.getTime() - createdAtDate.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)

    return (diffHours >= 24 ? true : false)
}

export default useTodos