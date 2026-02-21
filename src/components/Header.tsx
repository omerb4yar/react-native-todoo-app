import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Color from '../assets/Color'
import Logo from './Logo/Logo'

interface HeaderProps {}

const Header = ({} : HeaderProps) => {
  return (
    <View style = {styles.container}>

        <Logo size={16}/>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        paddingTop : 10,
        paddingVertical : 5,
        width : "100%"
    },
    button : {
        alignItems : "center",
        justifyContent : "center"
    }
})