import Todo from "../models/Todo";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
import { showMessage } from "react-native-flash-message";
import { CreateTodoType } from "../types/todoTypes";

const COLLECTION_NAME = "todos";

export const todoService = {


    async addTodo(todo: CreateTodoType): Promise<string | null> {

        const { content, isDone, priority, userId, title, deadlineTime } = todo;

        try {

            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                title,
                userId,
                isDone,
                content,
                priority,
                deadlineTime,
                isArchived: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            })

            return docRef.id;

        } catch (e: any) {
            throw e;
        }
    },

    async arhiveTodo(id: string): Promise<void> {
        try {

            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, {
                updatedAt: serverTimestamp(),
                archivedAt: serverTimestamp(),
                isArchived: true,
            })

        } catch (error: any) {
            throw error;
        }
    },

    async findTodoById(id: string): Promise<Todo> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const snapshot = await getDoc(docRef);
            if (!snapshot.exists()) {
                throw new Error("Todo bulunamadı");
            }
            return snapshot.data() as Todo;


        } catch (error: any) {
            throw error;
        }
    },

    async findTodosByUserId(uid: string, filters: { isArchived?: boolean } = { isArchived: false }): Promise<Todo[]> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("userId", "==", uid),
                where("isArchived", "==", filters?.isArchived)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return []

            const todos: Todo[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Todo[];
            return todos;
        } catch (e: any) {
            throw e;
        }
    },

    subscribeToTodos(uid: string, onUpdate: (todos: Todo[]) => void, filters: { isArchived?: boolean } = { isArchived: false }): () => void {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("userId", "==", uid),
            where("isArchived", "==", filters?.isArchived)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todos: Todo[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Todo[];
            onUpdate(todos);
        }, (error) => {
            console.error("subscribeToTodos error: ", error);
            throw error;
        });

        return unsubscribe;
    },

    async updateTodo(id: string, newTodo: Partial<Todo>): Promise<void> {

        try {

            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, {
                ...newTodo,
                updatedAt: serverTimestamp()
            })

        } catch (error: any) {
            throw error;
        }
    }

}