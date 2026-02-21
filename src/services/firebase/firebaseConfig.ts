import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";    
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAGCxyrL566TgIXa0HDxMd0RzRBgVJn-_g",
    authDomain: "todoapp-984f1.firebaseapp.com",
    projectId: "todoapp-984f1",
    storageBucket: "todoapp-984f1.firebasestorage.app",
    messagingSenderId: "789814314320",
    appId: "1:789814314320:web:977a678f6b1d4ab8991855"
}

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence : getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

