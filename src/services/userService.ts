import { createUserCredential } from "./firebase/auth";
import { db } from "./firebase/firebaseConfig";
import { doc, getDoc,serverTimestamp, setDoc, updateDoc,onSnapshot } from "firebase/firestore";
import UserType from "../types/User/User.type";


const COLLECTION_NAME = "users"

export const userService = {

    async createUser(email: string, password: string): Promise<{ uid: string }> {
        try {
            const user = await createUserCredential(email, password);

            const initialUsername = email.split("@")[0];

            await setDoc(doc(db, COLLECTION_NAME, user.uid), {
                email,
                username: initialUsername,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                notificationSettings: {
                    reminders: false,
                    sound: false,
                    vibration: false,
                },
                stats: {
                    complatedTodos: 0,
                    activeTodos: 0,
                    totalComplatedTodos: 0
                }
            } as UserType);

            return {
                uid: user.uid,
            }
        } catch (error) {
            throw error
        }
    },

    async updateUser(userId: string, newUser: UserType | any): Promise<void> {
        try {
            const docRef = doc(db, COLLECTION_NAME, userId);

            updateDoc(docRef, {
                ...newUser,
                updatedAt: serverTimestamp()
            })

        } catch (error) {
            throw error;
        }
    },

    async getUser(userId: string): Promise<UserType> {
        try {

            const docRef = doc(db, COLLECTION_NAME, userId);
            const snapshot = await getDoc(docRef);


            if (!snapshot.exists()) {
                console.log("getUser error")
                throw new Error("User not found");
            }

            const user: UserType = snapshot.data() as UserType;
            return user;

        } catch (error) {
            throw error
        }
    },

    subscribeToUser(userId: string, onUpdate: (user: UserType) => void): () => void {
        const docRef = doc(db, COLLECTION_NAME, userId);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                const user: UserType = snapshot.data() as UserType;
                onUpdate(user);
            }
        }, (error) => {
            console.error("subscribeToUser error: ", error);
            throw error;
        });

        return unsubscribe;
    }
}
