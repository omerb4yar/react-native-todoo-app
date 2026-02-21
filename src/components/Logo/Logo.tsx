import { View, Text, StyleProp, TextStyle, TextProps } from 'react-native'
import React from 'react'
import LogoStyle from './Logo.style'

interface LogoProps extends TextProps {
  size? : number,
  color? : string
}

const Logo = ({size, color, ...props} : LogoProps) => {
  return (
      <Text style = {[LogoStyle.logo, {fontSize : size}, color && {color}]}
        {...props}
      >To<Text style = {[LogoStyle.doo, color && {color}]}>doo</Text>!</Text>
  )
}

export default Logo