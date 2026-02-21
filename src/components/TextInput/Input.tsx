import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import InputStyles from './Input.styles'
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

interface InputProps extends TextInputProps {
    leftIcon? : ReactNode
    rightIcon? : ReactNode
    error? : boolean
    containerStyles? : StyleProp<ViewStyle>
    isPasswordInput? : boolean
}

const Input = ({leftIcon, rightIcon, isPasswordInput = false, error, containerStyles, ...props} : InputProps) => {

  const [isVisible, setVisible] = useState(isPasswordInput)

  return (
    <View
      style = {[InputStyles.container, containerStyles , error && InputStyles.error]}>
        {leftIcon && leftIcon}
        <TextInput
          secureTextEntry = {isVisible}
          style = {[InputStyles.input, props.style]}
          {...props}
          />
        {isPasswordInput ?  
        <TouchableOpacity 
          onPress={() => setVisible(value => !value)}
          style = {{position : "absolute", right : 15}}
          hitSlop={10}>
          <Icon name={!isVisible ? "eye" : "eye-off"} size={19}/>
        </TouchableOpacity> : null
        }
        {rightIcon && rightIcon}
    </View>
  )
}

export default Input
