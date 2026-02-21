import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'
import Logo from './Logo/Logo'
import Color from '../assets/Color'

const WelcomeHeader = ({...props} : ViewProps) => {

    const animation = useRef<LottieView>(null)
    
  return (
    <View style = {styles.header}>
        <View style = {{gap : 5}}>
            <Logo size={25} />
            <Text style = {styles.headerTitle}>
                Welcome to Todooo!,
                make todos than do it
            </Text>
        </View>
        <LottieView
            source={require("../assets/animations/Checklist.json")}
            autoPlay
            ref={animation}
            style={{
                width: 150,
                height: 150
            }}/>
    </View>
  )
}

export default WelcomeHeader

const styles = StyleSheet.create({
     header : {
            alignSelf : "flex-start",
            marginLeft : 50,
            flexDirection : "row",
            alignItems : "center"
        },
    headerTitle : {
        width : 150,
        fontWeight : "500",
        color : Color.lightblue,
        fontSize : 13
    },
})