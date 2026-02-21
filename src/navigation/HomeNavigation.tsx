import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomNavigation } from "react-native-paper"
import HomeScreen from '../screens/MainScreens/HomeScreen'
import ProfileScreen from '../screens/MainScreens/ProfileScreen/ProfileScreen'
import Color from '../assets/Color'
import CalendarScreen from '../screens/MainScreens/CalendarScreen'

const HomeNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'todos', title: 'Todos', focusedIcon: 'checkbox-multiple-marked', unfocusedIcon: 'checkbox-multiple-marked-outline'},
    { key: 'calendar', title: 'Calendar', focusedIcon: 'calendar', unfocusedIcon : "calendar-outline" },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon : "account-outline" }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    todos : HomeScreen,
    calendar : CalendarScreen,
    profile : ProfileScreen
  });

  return (
    <BottomNavigation
        shifting
        activeIndicatorStyle = {{backgroundColor : "#1b3c531c"}}
        inactiveColor={Color.primary}
        activeColor={Color.primary}
        barStyle = {{height : 80, backgroundColor : "white"}}
        labeled = {false}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene = {renderScene}/>
    )

}

export default HomeNavigation;