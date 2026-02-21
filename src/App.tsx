
import "./services/firebase/firebaseConfig";
import { StyleSheet, StatusBar as StatusBarRN } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';


import { UserProvider } from './context/UserContext';
import { TodoProvider } from './context/TodoContext';

export default function App() {

  return (
    <NavigationContainer>
      <UserProvider>
        <TodoProvider>
          <GestureHandlerRootView style={styles.container}>
            <RootNavigator />
            <FlashMessage position={"top"} floating statusBarHeight={StatusBarRN.currentHeight} />
            <StatusBar style='auto' />
          </GestureHandlerRootView>
        </TodoProvider>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
