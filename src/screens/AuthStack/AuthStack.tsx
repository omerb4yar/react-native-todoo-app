import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerShown : false,
                    animation : "slide_from_left"
                }}
                name="Login" 
                component={LoginScreen}/>
            <Stack.Screen 
                options={{
                    headerShown : false,
                    animation : "slide_from_right"

                }}
                name="Register" 
                component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack