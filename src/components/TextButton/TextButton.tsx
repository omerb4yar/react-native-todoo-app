

import { Text, Pressable, PressableProps, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import TextButtonStyle from './TextButton.style'

interface TextButtonProps extends PressableProps {
    titleStyle? : StyleProp<TextStyle>,
    title : string
}

const TextButton = ({titleStyle, title, ...props} : TextButtonProps) => {
  return (
    <Pressable style = {[TextButtonStyle.button, props.style]} {...props} >
        <Text style = {[TextButtonStyle.title, titleStyle]} >{title}</Text>
    </Pressable>
  )
}

export default TextButton