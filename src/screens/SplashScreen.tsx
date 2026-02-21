import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../components/Logo/Logo'

const SplashScreen = () => {
  return (
    <SafeAreaView style = {{flex : 1, alignItems : "center", justifyContent : "center", backgroundColor : "white"}}>
        <Logo size={20}/>
    </SafeAreaView>
  )
}

export default SplashScreen