import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { ProgressBar } from 'react-native-paper'
import { calcProgressScaleByOne } from '../utils/calcProgressScaleByOne'
import Color from '../assets/Color'
import { BORDER_RADIOUS } from '../constants/spacing'
import { ELEVATION } from '../constants/shadowing'

type ProgressBarCardType = {
    containerStyle? : StyleProp<ViewStyle>;
    progress : number,
    onPress? : () => void 
}

const ProgressBarCard = ({containerStyle, progress, onPress} : ProgressBarCardType) => {

    const todaysDate = new Date()
        .toLocaleDateString("en", {
            month : "short",
            day : "numeric"
        })

  return (
    <Pressable android_ripple={{color : "rgba(0, 0, 0, .05)", foreground : true}} onPress={onPress} style = {[styles.container, containerStyle && containerStyle]}>
        <View style = {styles.top}>
            <Text style = {styles.title}>Today</Text>
            <Text style = {styles.date}>({todaysDate})</Text>
        </View>
        <View style = {styles.progressContainer}>
            <ProgressBar progress={calcProgressScaleByOne(progress)} color={Color.sucsess} style = {styles.progressBar} />
            <Text style = {styles.progressText}>%{progress}</Text>
        </View>
    </Pressable>
  )
}

export default ProgressBarCard

const styles = StyleSheet.create({
    container : {
        gap : 12,
        padding : 10,
        borderRadius : BORDER_RADIOUS,
        backgroundColor : "white",
        width : 320,
        overflow : "hidden",
        elevation : 2
    },

    top : {
        flexDirection : "row",
        alignItems : "center",
        gap : 10
    },

    progressText : {
        fontWeight : "bold", color : Color.primary
    },

    progressBar : {
        height : 8, width : 250, borderRadius : 5
    },

    title : {
        fontWeight : "bold", 
        color : Color.lightblue,
        fontSize : 15,
    },

    progressContainer : {
        flexDirection : "row", 
        alignItems : "center", 
        justifyContent : "center", 
        gap : 10
    },

    date : {
        fontSize : 14,
        fontWeight : "bold",
        color : "gray"
    }
})