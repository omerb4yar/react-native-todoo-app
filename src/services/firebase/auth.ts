import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from "firebase/auth";

const auth = getAuth();

export const createUserCredential = async (email : string, password : string) : Promise<User> => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
        
    } catch (error) {
        throw error
    }
}

export const signInUser = async (email : string, password : string) : Promise<any> => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;

    } catch (error) {
        throw error;
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);

    } catch (error) {
        throw error;
    }
}



