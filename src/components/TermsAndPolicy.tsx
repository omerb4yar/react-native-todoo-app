import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import Color from '../assets/Color'

interface TermsAndPolicy extends TouchableOpacityProps {
    onPress : () => void
}

const TermsAndPolicy = ({...props} : TermsAndPolicy) => {
  return (
      <TouchableOpacity style = {[styles.button, props.style]} {...props}>
        <Text style = {styles.buttonTitle}>Terms & Privacy Policy</Text>
      </TouchableOpacity>
  )
}

export default TermsAndPolicy

const styles = StyleSheet.create({
    button : {
        position : "absolute",
        bottom : 28
    },
    buttonTitle : {
        fontSize : 12,
        fontWeight : "bold",
        color : Color.primary,
        textDecorationLine : "underline"
    }
})