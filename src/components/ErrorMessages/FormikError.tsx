import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native'
import React from 'react'
import Color from '../../assets/Color'

interface FormikErrorType extends ViewProps {
    errMsg : string,
    messageStyles? : StyleProp<TextStyle>
}

const FormikError = ({errMsg, messageStyles, ...props} : FormikErrorType ) => {
  return (
    <View
        style = {[styles.container, props.style]}>
      <Text
        style = {[styles.message, messageStyles]}
        >{errMsg}</Text>
    </View>
  )
}

export default FormikError

const styles = StyleSheet.create({
    container : {
      
    },
    message : {
      color : Color.danger,
      fontSize : 11,
    }
})