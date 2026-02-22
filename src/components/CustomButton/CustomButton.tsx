import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import styles from './CustomButton.styles'

export type CustomButtonVariant = "primary" | "secondary" | "danger";

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  leftIcon?: ReactNode;

  buttonDisabled?: boolean;
  loading?: boolean;
  variant?: CustomButtonVariant;


  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  indicatorColor?: string
}

const CustomButton = ({
  onPress,
  title,
  variant = "primary",
  containerStyle,
  titleStyle,
  loading,
  indicatorColor,
  leftIcon,
  buttonDisabled
}: CustomButtonProps) => {
  return (
    <Pressable
      disabled={loading || buttonDisabled}
      android_ripple={{ color: "rgba(255, 255, 255, .2)", foreground: true }}
      style={[styles.container, styles[variant], loading && styles.disabled, containerStyle]}
      onPress={onPress}>

      <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center" }}>
        {
          loading ? <ActivityIndicator size={20} color={indicatorColor ? indicatorColor : "white"} /> : leftIcon && leftIcon
        }
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>

    </Pressable>
  )
}

export default CustomButton;