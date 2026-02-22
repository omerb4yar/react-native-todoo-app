import {createNativeStackNavigator} from "@react-navigation/native-stack"

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthStack from "../screens/AuthStack/AuthStack";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import HomeNavigation from "./HomeNavigation";
import SplashScreen from "../screens/SplashScreen";
import { RootStackParamList } from "../types/Navigation.types";

const auth = getAuth();

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    function handleAuthStateChanged(user : any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
      
    if (initializing) {
        return <SplashScreen/>;
    }
    

    return (
        <Stack.Navigator>

            
            {!user ? (<Stack.Screen
                options={{
                    headerShown : false
                }} 
                name="Auth"
                component={AuthStack}
            />)
                :
            (<Stack.Screen
                options={{
                    headerShown : false
                }} 
                name="Home" 
                component={HomeNavigation}/>)
            }
        </Stack.Navigator>
    )
}

export default RootNavigator;

const styles = StyleSheet.create({})